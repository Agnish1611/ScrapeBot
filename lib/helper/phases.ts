import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, 'creditsCost'>;

export function GetPhasesTotalCost(phases: Phase[]): number {
    return phases.reduce((acc, phase) => acc + (phase.creditsCost || 0), 0);
}