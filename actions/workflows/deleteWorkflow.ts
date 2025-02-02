'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteWorkflow(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    await prisma.workflow.delete({
        where: {
            id,
            userId: session.session.userId,
        }
    });

    revalidatePath("/workflows");
}