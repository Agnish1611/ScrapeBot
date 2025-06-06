"use client";

import { unpublishWorkflow } from "@/actions/workflows/unpublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

const UnpublishBtn = ({ workflowId }: { workflowId: string }) => {
  const mutation = useMutation({
    mutationFn: unpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished", { id: workflowId });
    },
    onError: (ctx) => {
      if (ctx.message === "NEXT_REDIRECT") {
        toast.success("Workflow unpublished", { id:workflowId });
      } else {
        toast.error(`Failed to unpublish workflow ${ctx.message}`, {
          id: workflowId,
        });
      }
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        toast.loading('Unpublishing workflow', { id: workflowId });
        mutation.mutate(workflowId);
      }}
      disabled={mutation.isPending}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
};

export default UnpublishBtn;
