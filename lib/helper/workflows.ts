import { AppNode } from "@/utils/types/appNode";
import { TaskRegistry } from "../workflow/task/registry";

export function CalculateWorkflowCost(nodes: AppNode[]) {
    return nodes.reduce((acc, node) => {
        return acc + TaskRegistry[node.data.type].credits;
    }, 0);
}