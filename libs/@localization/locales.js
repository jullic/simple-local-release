"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localeManager = exports.languages = void 0;
const simple_locale_manager_1 = require("simple-locale-manager");
const en_1 = require("./en");
exports.languages = ['en'];
const LOCALES = {
    en: new en_1.EN(),
};
exports.localeManager = new simple_locale_manager_1.LocaleManager(LOCALES, 'en');
