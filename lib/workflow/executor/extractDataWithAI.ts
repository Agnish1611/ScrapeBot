import { ExecutionEnvironment } from "@/utils/types/executor";
import { ExtractDataWithAITask } from "../task/extract-data-with-ai";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>,
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
      return false;
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
      return false;
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input->content not defined");
      return false;
    }

    //get credential from database
    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials,
      },
    });
    if (!credential) {
      environment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("Failed to decrypt credential value");
      return false;
    }

    const genAI = new GoogleGenerativeAI(plainCredentialValue);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction:
        "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
    });

    const response = await model.generateContent(
      `Content:\n${content}\n\nPrompt:\n${prompt}`,
    );

    environment.log.info(
      `Prompt tokens: ${response.response.usageMetadata?.promptTokenCount}`,
    );
    environment.log.info(
      `Completition tokens: ${response.response.usageMetadata?.candidatesTokenCount}`,
    );

    const result = response.response.text();
    if (!result) {
      environment.log.error("Empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      environment.log.error(error.message);
    } else {
      environment.log.error("An unknown error occurred");
    }
    return false;
  }
}
