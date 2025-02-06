'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { workflowSchema } from "@/lib/zod";
import { AppNode } from "@/utils/types/appNode";
import { TaskType } from "@/utils/types/task";
import { WorkflowStatus } from "@/utils/types/workflow";
import { Edge } from "@xyflow/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createWorkflow(form: z.infer<typeof workflowSchema>) {
    const { success, data } = workflowSchema.safeParse(form);

    if (!success) {
        throw new Error("Invalid form data");
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    const initialFlow: { nodes: AppNode[], edges: Edge[] } = {
        nodes: [],
        edges: []
    }

    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
        data: {
            userId: session.session.userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data
        }
    });

    if (!result) {
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflow/editor/${result.id}`);
}