import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';
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
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}