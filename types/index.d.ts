import winston from 'winston';

import { localeManager } from '../libs/@localization/locales';

export declare global {
	export var logger: winston.Logger;
	export var slrLocaleManager: typeof localeManager;
}
