'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Period } from "@/utils/types/analytics";
import { headers } from "next/headers";

export async function getPeriods() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    const years = await prisma.workflowExecution.aggregate({
        where: {
            userId: session.session.userId,
        },
        _min: { startedAt: true },
    });

    const currentYear = new Date().getFullYear();

    const minYear = years._min.startedAt
        ? years._min.startedAt.getFullYear()
        : currentYear;

    const periods:Period[] = [];
    for (let year = minYear; year <= currentYear; year++) {
        for (let month = 0; month < 12; month++) {
            periods.push({
                year,
                month,
            });
        }
    }

    return periods;
}