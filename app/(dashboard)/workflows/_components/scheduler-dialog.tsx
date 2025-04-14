"use client";

import { updateWorkflowCron } from "@/actions/workflows/updateWorkflowCron";
import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import { CronExpressionParser } from "cron-parser";
import { removeWorkflowCron } from "@/actions/workflows/removeWorkflowCron";
import { Separator } from "@/components/ui/separator";

const SchedulerDialog = (props: {
  workflowId: string;
  cron: string | null;
}) => {
  const [cron, setCron] = useState(props.cron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const mutation = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Failed to update schedule", { id: "cron" });
    },
  });

  const removeScheduleMutation = useMutation({
    mutationFn: removeWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule removed successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Failed to remove schedule", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      CronExpressionParser.parse(cron);
      const readableCronsStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(readableCronsStr);
    } catch (error) {
      console.log(error);
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = props.cron && props.cron.length > 0;
  const readableCronStr =
    workflowHasValidCron && cronstrue.toString(props.cron!);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn(
            "text-sm p-0 h-auto text-primary",
            workflowHasValidCron && "text-green-500"
          )}
        >
          {workflowHasValidCron ? (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableCronStr}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3" /> Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
              validCron && "border-primary text-primary"
            )}
          >
            {validCron ? readableCron : "Not a valid cron expression"}
          </div>
          {workflowHasValidCron && (
            <DialogClose asChild>
              <div className="px-8">
                <Button
                  className="w-full text-destructive border-destructive hover:text-destructive"
                  variant="outline"
                  disabled={mutation.isPending || removeScheduleMutation.isPending}
                  onClick={() => {
                    toast.loading("Removing schedule...", { id: "cron" });
                    removeScheduleMutation.mutate(props.workflowId);
                  }}
                >
                  Remove current schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading("Saving...", { id: "cron" });
                mutation.mutate({ id: props.workflowId, cron });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerDialog;
