'use server';

import { auth } from "@/auth";
import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/utils/types/analytics";
import { WorkflowExecutionStatus } from "@/utils/types/workflow";
import { headers } from "next/headers";

const { COMPLETED, FAILED } = WorkflowExecutionStatus;

export async function getStatsCardsValues(period: Period) {
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
            status: {
                in: [COMPLETED, FAILED]
            }
        },
        select: {
            creditsConsumed: true,
            phases: {
                where: {
                    creditsCost: {
                        not: null
                    }
                },
                select: {
                    creditsCost: true
                }
            }
        }
    });

    const stats = {
        workflowExecutions: executions.length,
        creditsConsumed: 0,
        phaseExecutions: 0,
    };

    stats.creditsConsumed = executions.reduce(
        (sum, execution) => sum + execution.creditsConsumed,
        0
    );

    stats.phaseExecutions = executions.reduce(
        (sum, execution) => sum + execution.phases.length,
        0
    );

    return stats;
}