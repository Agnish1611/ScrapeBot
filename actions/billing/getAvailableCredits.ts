'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getAvailableCredits() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    const balance = await prisma.user.findUnique({
        where: {
            id: session.session.userId,
        },
        select: {
            credits: true,
        },
    });
    
    if (!balance?.credits) return -1;
    return balance.credits;
}