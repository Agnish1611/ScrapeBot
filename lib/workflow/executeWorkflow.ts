import 'server-only';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { ExecutionPhaseStatus, WorkflowExecutionStatus, WorkflowTask } from '@/utils/types/workflow';
import { ExecutionPhase, Workflow, WorkflowExecution } from '@prisma/client';
import { AppNode } from '@/utils/types/appNode';
import { TaskRegistry } from './task/registry';
import { ExecutorRegistry } from './executor/registry';
import { Environment, ExecutionEnvironment } from '@/utils/types/executor';
import { TaskParamType } from '@/utils/types/task';
import { Browser, Page } from 'puppeteer';
import { Edge } from '@xyflow/react';
import { LogCollector } from '@/utils/types/log';
import { createLogCollector } from '../log';

type ExecutionWithRelations = WorkflowExecution & {
    workflow: Workflow;
    phases: ExecutionPhase[];
};

export async function executeWorkflow(executionId: string, nextRunAt?: Date) {
    const execution = await prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
        },
        include: {
            workflow: true,
            phases: true,
        },
    });

    if (!execution) {
        throw new Error("Execution not found");
    }

    const edges = JSON.parse(execution.workflow.definition).edges as Edge[];

    const environment: Environment = { phases: {} };

    await initializeWorkflowExecution(executionId, execution.workflowId, nextRunAt);
    await initializePhaseStatus(execution);

    let creditsConsumed = 0;
    let executionFailed = false;
    for (const phase of execution.phases) {
        const phaseExecution = await executeWorkflowPhase(phase, environment, edges, execution.userId);
        creditsConsumed += phaseExecution.creditsConsumed;
        if (!phaseExecution.success) {
            executionFailed = true;
            break;
        }
    }

    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed);
    await cleanupEnvironment(environment);

    revalidatePath('/workflow/runs');
}

async function initializeWorkflowExecution(executionId: string, workflowId: string, nextRunAt?: Date) {
    await prisma.workflowExecution.update({
        where: {
            id: executionId,
        },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING,
        },
    });

    await prisma.workflow.update({
        where: {
            id: workflowId,
        },
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId,
            ...(nextRunAt && { nextRunAt }),
        },
    });
}

async function initializePhaseStatus(execution: ExecutionWithRelations) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase) => phase.id),
            }
        },
        data: {
            status: ExecutionPhaseStatus.PENDING,
        }
    })
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, executionFailed: boolean, creditsConsumed: number) {
    const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;

    await prisma.workflowExecution.update({
        where: {
            id: executionId,
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed,
        },
    });

    await prisma.workflow.update({
        where: {
            id: workflowId,
            lastRunId: executionId,
        },
        data: {
            lastRunStatus: finalStatus,
        },
    }).catch((err) => {
        console.log(err);
    });
}

async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment, edges: Edge[], userId: string) {
    const logCollector = createLogCollector();
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;
    setupEnvironment(node, environment, edges);

    await prisma.executionPhase.update({
        where: {
            id: phase.id,
        },
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt,
            inputs: JSON.stringify(environment.phases[node.id].inputs),
        },
    });

    const creditsRequired = TaskRegistry[node.data.type].credits;

    let success = await decrementCredits(userId, creditsRequired, logCollector);
    const creditsConsumed = success ? creditsRequired : 0;

    if (success) {
        success = await executePhase(phase, node, environment, logCollector);
    }

    const outputs = environment.phases[node.id].outputs;
    await finalizePhase(phase.id, success, outputs, logCollector, creditsConsumed);
    return { success, creditsConsumed };
}

async function finalizePhase(phaseId: string, success: boolean, outputs: Record<string, unknown>, logCollector: LogCollector, creditsConsumed: number) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;

    await prisma.executionPhase.update({
        where: {
            id: phaseId,
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            outputs: JSON.stringify(outputs),
            creditsCost: creditsConsumed,
            logs: {
                createMany: {
                    data: logCollector.getAll().map((log) => ({
                        message: log.message,
                        logLevel: log.level,
                        timestamp: log.timestamp,
                    })),
                }
            }
        },
    });
}

async function executePhase(phase: ExecutionPhase, node: AppNode, environment: Environment, logCollector: LogCollector): Promise<boolean> {
    const runFn = ExecutorRegistry[node.data.type];
    if (!runFn) {
        logCollector.error(`Executor not found for ${node.data.type}`);
        return false;
    }

    const executionEnvironment = createExecutionEnvironment<typeof TaskRegistry[typeof node.data.type]>(node, environment, logCollector);

    return await runFn(executionEnvironment);
}

function setupEnvironment(node: AppNode, environment: Environment, edges: Edge[]) {
    environment.phases[node.id] = { inputs: {}, outputs: {} };
    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs) {
        if (input.type === TaskParamType.BROWSER_INSTANCE) continue;
        const inputValue = node.data.inputs[input.name];
        if (inputValue) {
            environment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        const connectedEdge = edges.find((edge) => edge.target === node.id && edge.targetHandle === input.name);

        if (!connectedEdge) {
            console.error('Missing input', node.id, input.name);
            continue;
        }

        const outputValue = environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!];

        environment.phases[node.id].inputs[input.name] = outputValue;
    }
}

function createExecutionEnvironment<T extends WorkflowTask>(node: AppNode, environment: Environment, logCollector: LogCollector): ExecutionEnvironment<T> {
    return {
        getInput: (name: string) => environment.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => (environment.phases[node.id].outputs[name] = value),

        getBrowser: () => environment.browser,
        setBrowser: (browser: Browser) => (environment.browser = browser),

        getPage: () => environment.page,
        setPage: (page: Page) => (environment.page = page),

        log: logCollector,
    }
}

async function cleanupEnvironment(environment: Environment) {
    if (environment.browser) {
        await environment.browser.close().catch((err) => console.log('Cannot close browser', err));
    }
}

async function decrementCredits(userId: string, credits: number, logCollector: LogCollector) {
    try {
        await prisma.user.update({
            where: {
                id: userId,
                credits: { gte: credits },
            },
            data: {
                credits: {
                    decrement: credits,
                },
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        logCollector.error('Insufficient balance');
        return false;
    }
}