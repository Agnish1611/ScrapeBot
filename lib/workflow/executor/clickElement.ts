import { ExecutionEnvironment } from '@/utils/types/executor';
import { ClickElementTask } from '../task/click-element';

export async function ClickElementExecutor(environment: ExecutionEnvironment<typeof ClickElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput('Selector');
        if (!selector) {
            environment.log.error('input->selector not defined');
            return false;
        }

        await environment.getPage()!.click(selector);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            environment.log.error(error.message);
        } else {
            environment.log.error('An unknown error occurred');
        }
        return false;
    }
}