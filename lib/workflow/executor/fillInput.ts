import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';

export async function FillInputExecutor(environment: ExecutionEnvironment<typeof FillInputTask>): Promise<boolean> {
    try {
        const selector = environment.getInput('Selector');
        if (!selector) {
            environment.log.error('input->selector not defined');
            return false;
        }
        const value = environment.getInput('Value');
        if (!value) {
            environment.log.error('input->value not defined');
            return false;
        }

        await environment.getPage()!.type(selector, value);
        return true;
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}