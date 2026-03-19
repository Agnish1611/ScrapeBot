import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { LaunchBrowserTask } from '../task/launch-browser';

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {
        const websiteUrl = environment.getInput('Website URL');
        const isLocal = process.env.NODE_ENV === 'development';
        const browser = await puppeteer.launch({
            args: isLocal ? [] : chromium.args,
            // @ts-expect-error - missing types
            defaultViewport: chromium.defaultViewport,
            executablePath: isLocal ? undefined : await chromium.executablePath(),
            // @ts-expect-error - missing types
            headless: chromium.headless,
            channel: isLocal ? 'chrome' : undefined,
        });
        environment.log.info('Browser started successfully');
        environment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);
        environment.setPage(page);
        environment.log.info(`Opened page at: ${websiteUrl}`);
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