'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { duplicateWorkflowSchema, duplicateWorkflowSchemaType } from "@/lib/zod";
import { WorkflowStatus } from "@/utils/types/workflow";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function duplicateWorkflow(form: duplicateWorkflowSchemaType) {
    const {success, data} = duplicateWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    const sourceWorkflow = await prisma.workflow.findUnique({
        where: {
            id: data.workflowId,
            userId: session.session.userId,
        },
    });
    if (!sourceWorkflow) {
        throw new Error("Workflow not found");
    }

    const result = await prisma.workflow.create({
        data: {
            userId: session.session.userId,
            name: data.name,
            description: data.description,
            definition: sourceWorkflow.definition,
            status: WorkflowStatus.DRAFT,
        },
    });
    if (!result) {
        throw new Error("Failed to duplicate workflow");
    }

    revalidatePath('/workflows');
}