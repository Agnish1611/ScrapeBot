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
import { ExtractDataWithAIExecutor } from "./extractDataWithAI";
import { ReadPropertyFromJsonExecutor } from "./readPropertyFromJson";
import { AddPropertyToJsonExecutor } from "./addPropertyToJson";
import { NavigateUrlExecutor } from "./navigate-url";
import { ScrollToElementExecutor } from "./scrollToElement";

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
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAIExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
    NAVIGATE_URL: NavigateUrlExecutor,
    SCROLL_TO_ELEMENT: ScrollToElementExecutor
}