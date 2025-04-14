import { getWorkflows } from "@/actions/workflows/getWorkflows";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";
import WorkFlowCard from "./_components/workflow-card";

const page = () => {
  return (
    <div>
      <div className="flex w-full justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog triggerText="Create workflow" />
      </div>
      <div>
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

async function UserWorkflows() {
  const workflows = await getWorkflows();

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }
  return (
    <div className="grid gird-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkFlowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}

export default page;
