import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';
import { ClickElementTask } from '../task/click-element';
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
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}