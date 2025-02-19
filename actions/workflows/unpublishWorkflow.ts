'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/utils/types/workflow";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function unpublishWorkflow(id: string) {
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

    if (workflow.status !== WorkflowStatus.PUBLISHED) {
        throw new Error("Workflow is not published");
    }

    await prisma.workflow.update({
        where: {
            id,
            userId: session.session.userId,
        },
        data: {
            status: WorkflowStatus.DRAFT,
            executionPlan: null,
            creditsCost: 0,
        },
    });

    revalidatePath(`/workflow/editor/${id}`);
}