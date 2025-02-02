'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { workflowSchema } from "@/lib/zod";
import { WorkflowStatus } from "@/utils/types/workflow";
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

    const result = await prisma.workflow.create({
        data: {
            userId: session.session.userId,
            status: WorkflowStatus.DRAFT,
            definition: "TODO",
            ...data
        }
    });

    if (!result) {
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflows/editor/${result.id}`);
}