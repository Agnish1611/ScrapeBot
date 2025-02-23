import { TaskParamType, TaskType } from "@/utils/types/task";
import { WorkflowTask } from "@/utils/types/workflow";
import { BrainIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ExtractDataWithAITask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with AI",
  icon: (props) => (
    <BrainIcon className="stroke-primary" {...props} />
  ),
  isEntryPoint: false,
  credits: 4,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
