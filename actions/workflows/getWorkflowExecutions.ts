'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getWorkflowExecutions(workflowId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    return prisma.workflowExecution.findMany({
        where: {
            workflowId,
            userId: session.session.userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}