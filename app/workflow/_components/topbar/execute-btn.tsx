'use client'

import { runWorkflow } from "@/actions/workflows/runWorkflow"
import useExecutionPlan from "@/components/hooks/useExecutionPlan"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { PlayIcon } from "lucide-react"
import { toast } from "sonner"

const ExecuteBtn = ({ workflowId }: { workflowId: string}) => {
    const generate = useExecutionPlan();

    const mutation = useMutation({
        mutationFn: runWorkflow,
        onSuccess: () => {
            toast.success('Execution started', { id: 'flow-execution' });
        },
        onError: () => {
            toast.error('Failed to start execution', { id: 'flow-execution' });
        },
    })

  return (
    <Button variant='outline' className="flex items-center gap-2" onClick={() => {
        const plan = generate();
    }}>
        <PlayIcon size={16} className="stroke-primary" />
        Execute
    </Button>
  )
}

export default ExecuteBtn