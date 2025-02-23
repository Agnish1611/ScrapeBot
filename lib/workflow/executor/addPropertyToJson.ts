import { ExecutionEnvironment } from '@/utils/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch-browser';
import { PageToHtmlTask } from '../task/page-to-html';
import { FillInputTask } from '../task/fill-input';
import { ClickElementTask } from '../task/click-element';
import { ReadPropertyFromJsonTask } from '../task/read-property-from-json';
import { AddPropertyToJsonTask } from '../task/add-property-to-json';

export async function AddPropertyToJsonExecutor(environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>): Promise<boolean> {
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

        const propertyValue = environment.getInput('Property value');
        if (!propertyValue) {
            environment.log.error('input->propertyValue not defined');
            return false;
        }

        const json = JSON.parse(jsonData);
        json[propertyName] = propertyValue;

        environment.setOutput('Update JSON', JSON.stringify(json));
        return true;
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}