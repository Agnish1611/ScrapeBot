import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';
import { ClickElementTask } from '../task/click-element';
import { ReadPropertyFromJsonTask } from '../task/read-property-from-json';

export async function ReadPropertyFromJsonExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>): Promise<boolean> {
    try {
        const jsonData = environment.getInput('JSON');
        if (!jsonData) {
            environment.log.error('input->jsonData not defined');
            return false;
        }

        const propertyName = environment.getInput('Property name');
        if (!propertyName) {
            environment.log.error('input->propertyName not defined');
            return false;
        }

        const json = JSON.parse(jsonData);
        const propertyValue = json[propertyName];
        if (propertyValue === undefined) {
            environment.log.error(`Property not found`);
            return false;
        }

        environment.setOutput('Property value', propertyValue);
        return true;
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}