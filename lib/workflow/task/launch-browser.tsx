import { TaskParamType, TaskType } from "@/utils/types/task";
import { WorkflowTask } from "@/utils/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch Browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-primary" {...props} />
    ),
    isEntryPoint: true,
    credits: 5,
    inputs: [
        {
            name: "Website URL",
            type: TaskParamType.STRING,
            helperText: "eg: https://example.com",
            required: true,
            hideHandle: true,
        }
    ],
    outputs: [
        {
            name: 'Web page',
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ]
} satisfies WorkflowTask;