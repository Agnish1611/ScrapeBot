'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { number } from "zod";

export async function getWorkflowExecution(executionId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }
    
    return prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
            userId: session.session.userId,
        },
        include: {
            phases: {
                orderBy: {
                    number: 'asc',
                },
            },
        },
    });
}