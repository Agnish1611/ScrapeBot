'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { executeWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/exexutionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger, WorkflowStatus } from "@/utils/types/workflow";
import { User } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function runWorkflow(form: { workflowId: string, flowDefinition?: string }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    const { workflowId, flowDefinition } = form;

    if (!workflowId) {
        throw new Error("workflowId is required");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId: session.session.userId,
        },
    });

    if (!workflow) {
        throw new Error("Workflow not found");
    }

    let executionPlan: WorkflowExecutionPlan;
    let workflowDefinition = flowDefinition;
    if (workflow.status === WorkflowStatus.PUBLISHED) {
        if (!workflow.executionPlan) {
            throw new Error("No execution plan found in published workflow");
        }
        executionPlan = JSON.parse(workflow.executionPlan);
        workflowDefinition = workflow.definition;
    } else {
        if (!flowDefinition) {
            throw new Error("flow definition in not defined");
        }
    
        const flow = JSON.parse(flowDefinition);
        const result = FlowToExecutionPlan(flow.nodes, flow.edges);
        if (result.error) {
            throw new Error("Invalid flow definition");
        }
    
        if (!result.executionPlan) {
            throw new Error("Failed to generate execution plan");
        }
    
        executionPlan = result.executionPlan;
    }

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId: session.session.userId,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkflowExecutionTrigger.MANUAL,
            definition: workflowDefinition,
            phases: {
                create: executionPlan.flatMap((phase) => {
                    return phase.nodes.flatMap((node) => {
                        return {
                            userId: session.session.userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,
                        }
                    });
                }),
            }
        },
        select: {
            id: true,
            phases: true,
        },
    });

    if (!execution) {
        throw new Error("Failed to create workflow execution");
    }

    executeWorkflow(execution.id);
    redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}