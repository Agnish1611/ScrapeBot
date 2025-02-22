'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function removeWorkflowCron(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    await prisma.workflow.update({
        where: {
            id,
            userId: session.session.userId,
        },
        data: {
            cron: null,
            nextRunAt: null,
        }
    });

    revalidatePath('/workflows');
}