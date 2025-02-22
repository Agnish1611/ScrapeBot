'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteCredential(name: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error('Not authenticated');
    }

    await prisma.credential.delete({
        where: {
            name_userId: {
                name,
                userId: session.session.userId,
            }
        }
    });

    //can check if any workflow is using this credential and remove it from there

    revalidatePath('/credentials');
}