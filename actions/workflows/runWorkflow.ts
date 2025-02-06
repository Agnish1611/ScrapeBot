'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/exexutionPlan";
import { WorkflowExecutionPlan } from "@/utils/types/workflow";
import { headers } from "next/headers";

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
    console.log("Execution plan", executionPlan);
}