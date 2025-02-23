import { TaskType } from "@/utils/types/task";
import { ExtractTextFromElementTask } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { WorkflowTask } from "@/utils/types/workflow";
import { FillInputTask } from "./fill-input";
import { ClickElementTask } from "./click-element";
import { WaitForElementTask } from "./wait-for-element";
import { DeliverViaWebhookTask } from "./deliver-via-webhook";
import { ExtractDataWithAITask } from "./extract-data-with-ai";
import { ReadPropertyFromJsonTask } from "./read-property-from-json";
import { AddPropertyToJsonTask } from "./add-property-to-json";
import { NavigateUrlTask } from "./navigate-url";
import { ScrollToElementTask } from "./scroll-to-element";

type Registry = {
    [K in TaskType]: WorkflowTask & { type: K };
}

export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    WAIT_FOR_ELEMENT: WaitForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAITask,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
    NAVIGATE_URL: NavigateUrlTask,
    SCROLL_TO_ELEMENT: ScrollToElementTask
}