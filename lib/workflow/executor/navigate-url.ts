import { ExecutionEnvironment } from '@/utils/types/executor';
import { NavigateUrlTask } from '../task/navigate-url';

export async function NavigateUrlExecutor(environment: ExecutionEnvironment<typeof NavigateUrlTask>): Promise<boolean> {
    try {
        const url = environment.getInput('URL');
        if (!url) {
            environment.log.error('input->url not defined');
            return false;
        }

        await environment.getPage()!.goto(url);
        environment.log.info(`Navigated to ${url}`);
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