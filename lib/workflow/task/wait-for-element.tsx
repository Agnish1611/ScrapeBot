import { TaskParamType, TaskType } from "@/utils/types/task";
import { WorkflowTask } from "@/utils/types/workflow";
import { EyeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for Element",
  icon: (props) => (
    <EyeIcon className="stroke-primary" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Visibility",
      type: TaskParamType.SELECT,
      hideHandle: true,
      required: true,
      options: [
        {
          value: "visible",
          label: "Visible",
        },
        {
          value: "hidden",
          label: "Hidden",
        },
      ]
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
