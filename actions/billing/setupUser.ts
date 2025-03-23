'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function setupUser() {
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

    if (!balance?.credits) {
        await prisma.user.update({
            where: {
                id: session.session.userId,
            },
            data: {
                credits: 100,
            },
        });
    }

    redirect('/');
}