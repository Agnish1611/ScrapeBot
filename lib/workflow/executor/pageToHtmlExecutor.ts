import { ExecutionEnvironment } from '@/utils/types/executor';
import { PageToHtmlTask } from '../task/page-to-html';

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
    try {
        const html = await environment.getPage()!.content();
        environment.setOutput('Html', html);
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