import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';
import { ClickElementTask } from '../task/click-element';
import { NavigateUrlTask } from '../task/navigate-url';
import { env } from 'process';

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
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}