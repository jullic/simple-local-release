import { LocaleManager } from 'simple-locale-manager';

import { EN } from './en';

export const languages = ['en'] as const;

const LOCALES: Record<(typeof languages)[number], EN> = {
	en: new EN(),
};

export const localeManager = new LocaleManager(LOCALES, 'en');
