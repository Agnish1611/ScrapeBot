import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/utils/types/task";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";
import { useCallback, useEffect } from "react";
import { AppNode } from "@/utils/types/appNode";
import DeletableEdge from "./edges/deletable-edge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  ScrapeBotNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2 };

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const taskType = e.dataTransfer.getData("application/reactflow");
    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((prevNodes) => prevNodes.concat(newNode));
  }, [screenToFlowPosition, setNodes]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) => addEdge({ ...connection, animated: true}, prevEdges));
    if (!connection.targetHandle) return;

    const node = nodes.find(nd => nd.id === connection.target);
    if (!node) return;

    const nodeInputs = node.data.inputs;
    updateNodeData(node.id, {
      inputs: {
        ...nodeInputs,
        [connection.targetHandle]: "",
      },
    });
  }, [setEdges, updateNodeData, nodes]);

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    if (connection.source === connection.target) return false;
    
    const source = nodes.find((node) => node.id === connection.source);
    const target = nodes.find((node) => node.id === connection.target);

    if (!source || !target) return false;

    const sourceTask = TaskRegistry[source.data.type];
    const targetTask = TaskRegistry[target.data.type];

    const output = sourceTask.outputs.find((output) => output.name === connection.sourceHandle);
    const input = targetTask.inputs.find((input) => input.name === connection.targetHandle);

    if (input?.type !== output?.type) {
      console.error('Invalid connection. Source and target types does not match. ', output, input);
      return false;
    }
    
    const hasCycle = (node: AppNode, visited = new Set()) => {
      if (visited.has(node.id)) return false;
      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };
    const detectedCycle = hasCycle(target);

    return !detectedCycle;
  }, [nodes]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
