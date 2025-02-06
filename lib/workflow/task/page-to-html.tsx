import { TaskParamType, TaskType } from "@/utils/types/task";
import { WorkflowTask } from "@/utils/types/workflow";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get HTML from page",
    icon: (props: LucideProps) => (
        <CodeIcon className="stroke-primary" {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }
    ],
    outputs: [
        {
            name: 'Html',
            type: TaskParamType.STRING,
        },
        {
            name: 'Web page',
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ]
} satisfies WorkflowTask;