import { TaskType } from "@/utils/types/task";
import { LaunchBrowserExecutor } from "./launchBrowserExecutor";
import { PageToHtmlExecutor } from "./pageToHtmlExecutor";
import { WorkflowTask } from "@/utils/types/workflow";
import { ExecutionEnvironment } from "@/utils/types/executor";
import { ExtractTextFromElementExecutor } from "./extractTextFromHtml";
import { FillInputExecutor } from "./fillInput";
import { ClickElementExecutor } from "./clickElement";
import { WaitForElementExecutor } from "./waitForElement";
import { DeliverViaWebhookExecutor } from "./deliverViaWebhook";

type ExecutorFn<T extends WorkflowTask> = (environment: ExecutionEnvironment<T>) => Promise<boolean>;

type RegistryType = {
    [K in TaskType]: ExecutorFn<WorkflowTask & {type: K}>;
}

export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,
    WAIT_FOR_ELEMENT: WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor
}