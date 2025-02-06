'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateWorkflow({ id, definition }: { id: string; definition: string; }) {
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
        }
    });

    if (!workflow) {
        throw new Error("Workflow not found");
    }

    if (workflow.status !== "DRAFT") {
        throw new Error("Workflow is already published");
    }

    await prisma.workflow.update({
        data: {
            definition,
        },
        where: {
            id,
            userId: session.session.userId,
        }
    });

    revalidatePath('/workflows')
}