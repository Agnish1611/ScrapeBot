'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getCredentialsForUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error('Not authenticated');
    }

    return prisma.credential.findMany({
        where: {
            userId: session.session.userId,
        },
        orderBy: {
            name: 'asc',
        }
    })
}