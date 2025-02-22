'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { CronExpressionParser } from 'cron-parser';
import { revalidatePath } from "next/cache";

export async function updateWorkflowCron({ id, cron }: { id: string; cron: string; }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error("Not authenticated");
    }

    try {
        const interval = CronExpressionParser.parse(cron);
        await prisma.workflow.update({
            where: {
                id,
                userId: session.session.userId,
            },
            data: {
                cron,
                nextRunAt: interval.next().toDate(),
            }
        });
    } catch (error: any) {
        console.error('invalid cron', error.message);
        throw new Error('Invalid cron expression');
    }

    revalidatePath('/workflows');
}