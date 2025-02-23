"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/utils/types/task";
import { CoinsIcon } from "lucide-react";
import React from "react";

const TaskMenu = () => {
  return (
    <aside className="w-[320px] min-w-[320px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["extraction", "interactions", 'timing', 'storage', 'results']}
      >
        <AccordionItem value="interactions">
          <AccordionTrigger className="font-bold">
            User interactions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.FILL_INPUT} />
            <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT} />
            <TaskMenuBtn taskType={TaskType.NAVIGATE_URL} />
            <TaskMenuBtn taskType={TaskType.SCROLL_TO_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="storage">
          <AccordionTrigger className="font-bold">
            Data storage
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.READ_PROPERTY_FROM_JSON} />
            <TaskMenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="timing">
          <AccordionTrigger className="font-bold">
            Timing controls
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="results">
          <AccordionTrigger className="font-bold">
            Result Delivery
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (e: React.DragEvent, type: TaskType) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
    >
      <div className="flex gap-2 text-xs items-center">
        <task.icon size={20} />
        {task.label}
      </div>
      <Badge variant='outline' className="gap-2 flex items-center">
        <CoinsIcon size={16} />
        {task.credits}
      </Badge>
    </Button>
  );
};

export default TaskMenu;
