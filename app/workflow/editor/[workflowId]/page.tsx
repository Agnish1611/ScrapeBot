// app/workflow/editor/[workflowId]/page.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Editor from "../../_components/editor";

interface PageProps {
  params: {
    workflowId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { workflowId } = params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <div>Unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId: session.session.userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
};

export default Page;
