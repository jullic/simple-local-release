import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

import { localeManager } from './@localization/locales';

const logger = createLogger({
	level: 'info',
	format: format.combine(
		// format.colorize(),
		format.printf(({ level, message }) => {
			if (typeof message !== 'string') {
				return message;
			}
			if (level.match('info')) {
				return message;
			}
			if (level.match('warn')) {
				return `${message
					.split('\n')
					.map((item) => chalk.bold.bgYellow(` ${level.toUpperCase()} `) + '\t' + item)
					.join('\n')}`;
			}
			if (level.match('err')) {
				return `${message
					.split('\n')
					.map((item) => chalk.bold.bgRed(` ${level.toUpperCase()} `) + '\t' + item)
					.join('\n')}`;
			}
			return `${level}: ${message}`;
		}),
	),
	transports: [new transports.Console()],
});

global.logger = logger;
global.slrLocaleManager = localeManager;
