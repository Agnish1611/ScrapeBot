import { getWorkflowExecution } from "@/actions/workflows/getWorkflowExecution";
import Topbar from "@/app/workflow/_components/topbar/topbar";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/execution-viewer";

const page = ({
  params,
}: {
  params: {
    workflowId: string;
    executionId: string;
  };
}) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="h-20 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
};

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await getWorkflowExecution(executionId);
  if (!workflowExecution) {
    return <div>Execution not found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
}

export default page;
