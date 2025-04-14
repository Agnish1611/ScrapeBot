import { ExecutionEnvironment } from '@/utils/types/executor';
import { DeliverViaWebhookTask } from '../task/deliver-via-webhook';

export async function DeliverViaWebhookExecutor(environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>): Promise<boolean> {
    try {
        const targetUrl = environment.getInput('Target URL');
        if (!targetUrl) {
            environment.log.error('input->targerUrl not defined');
            return false;
        }

        const body = environment.getInput('Body');
        if (!body) {
            environment.log.error('input->body not defined');
            return false;
        }

        const response = await fetch(targetUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        const statusCode = response.status;
        if (statusCode !== 200) {
            environment.log.error(`Status code: ${statusCode}`);
            return false;
        }

        const responseBody = await response.json();
        environment.log.info(JSON.stringify(responseBody, null, 4));
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