'use server';

import { auth } from "@/auth";
import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/utils/types/analytics";
import { WorkflowExecutionStatus } from "@/utils/types/workflow";
import { eachDayOfInterval, format } from "date-fns";
import { headers } from "next/headers";

type Stats = Record<
    string,
    {
        success: number;
        failed: number;
    }
>;

const dateFormat = 'yyyy-MM-dd';

export async function getWorkflowExecutionStats(period: Period) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    const dateRange = PeriodToDateRange(period);
    const executions = await prisma.workflowExecution.findMany({
        where: {
            userId: session.session.userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
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

    executions.forEach((execution) => {
        const date = format(execution.startedAt!, dateFormat);
        if (execution.status === WorkflowExecutionStatus.COMPLETED) {
            stats[date].success++;
        } 
        if (execution.status === WorkflowExecutionStatus.FAILED) {
            stats[date].failed++;
        }
    });

    const result = Object.entries(stats).map(([date, infos]) => ({
        date, 
        ...infos,
    }));

    return result;
}