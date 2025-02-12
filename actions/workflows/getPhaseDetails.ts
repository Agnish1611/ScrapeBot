'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getPhaseDetails(phaseId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    return prisma.executionPhase.findUnique({
        where: {
            id: phaseId,
            workflowExecution: {
                userId: session.session.userId,
            }
        },
    });
}