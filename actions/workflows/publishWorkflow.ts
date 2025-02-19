'use server';

import { auth } from "@/auth";
import { CalculateWorkflowCost } from "@/lib/helper/workflows";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/exexutionPlan";
import { WorkflowStatus } from "@/utils/types/workflow";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function publishWorkflow({id, flowDefinition}: {id: string; flowDefinition: string}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId: session.session.userId,
        },
    });

    if (!workflow) {
        throw new Error("Workflow not found");
    }

    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("Workflow is not a draft");
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
        throw new Error("Invalid flow definition");
    }

    if (!result.executionPlan) {
        throw new Error("No execution plan generated");
    }

    const creditsCost = CalculateWorkflowCost(flow.nodes);
    await prisma.workflow.update({
        where: {
            id,
            userId: session.session.userId,
        },
        data: {
            definition: flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            status: WorkflowStatus.PUBLISHED,
            creditsCost,
        },
    });

    revalidatePath(`/workflow/editor/${id}`);
}