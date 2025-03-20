'use server';

import { auth } from "@/auth";
import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/utils/types/analytics";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/utils/types/workflow";
import { eachDayOfInterval, format } from "date-fns";
import { headers } from "next/headers";

type Stats = Record<
    string,
    {
        success: number;
        failed: number;
    }
>;

const { COMPLETED, FAILED } = ExecutionPhaseStatus;

const dateFormat = 'yyyy-MM-dd';

export async function getCreditsUsageInPeriod(period: Period) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    const dateRange = PeriodToDateRange(period);
    const executionPhases = await prisma.executionPhase.findMany({
        where: {
            userId: session.session.userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
            status: {
                in: [COMPLETED, FAILED]
            }
        },
    });

    const stats: Stats = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
    })
        .map((date) => format(date, dateFormat))
        .reduce((acc, date) => {
            acc[date] = {
                success: 0,
                failed: 0,
            };
            return acc;
        }, {} as any);

    executionPhases.forEach((phase) => {
        const date = format(phase.startedAt!, dateFormat);
        if (phase.status === COMPLETED) {
            stats[date].success += phase.creditsCost || 0;
        }
        if (phase.status === FAILED) {
            stats[date].failed += phase.creditsCost || 0;
        }
    });

    const result = Object.entries(stats).map(([date, infos]) => ({
        date,
        ...infos,
    }));

    return result;
}