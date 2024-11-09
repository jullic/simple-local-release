"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const winston_1 = require("winston");
const locales_1 = require("./@localization/locales");
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(
    // format.colorize(),
    winston_1.format.printf(({ level, message }) => {
        if (typeof message !== 'string') {
            return message;
        }
        if (level.match('info')) {
            return message;
        }
        if (level.match('warn')) {
            return `${message
                .split('\n')
                .map((item) => chalk_1.default.bold.bgYellow(` ${level.toUpperCase()} `) + '\t' + item)
                .join('\n')}`;
        }
        if (level.match('err')) {
            return `${message
                .split('\n')
                .map((item) => chalk_1.default.bold.bgRed(` ${level.toUpperCase()} `) + '\t' + item)
                .join('\n')}`;
        }
        return `${level}: ${message}`;
    })),
    transports: [new winston_1.transports.Console()],
});
global.logger = logger;
global.slrLocaleManager = locales_1.localeManager;
