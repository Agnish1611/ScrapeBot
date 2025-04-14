import { ExecutionEnvironment } from '@/utils/types/executor';
import { WaitForElementTask } from '../task/wait-for-element';

export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitForElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput('Selector');
        if (!selector) {
            environment.log.error('input->selector not defined');
            return false;
        }

        const visibilty = environment.getInput('Visibility');
        if (!visibilty) {
            environment.log.error('input->visibilty not defined');
            return false;
        }

        await environment.getPage()!.waitForSelector(selector, { visible: visibilty === 'visible', hidden: visibilty === 'hidden' });
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