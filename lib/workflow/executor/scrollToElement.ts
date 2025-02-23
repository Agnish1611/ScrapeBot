import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';
import { ClickElementTask } from '../task/click-element';
import { ScrollToElementTask } from '../task/scroll-to-element';

export async function ScrollToElementExecutor(environment: ExecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput('Selector');
        if (!selector) {
            environment.log.error('input->selector not defined');
            return false;
        }

        await environment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error('Element not found');
            }
            const top = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top });
        }, selector);
        return true;
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}