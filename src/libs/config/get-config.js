"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.BASE_CONFIG = exports.configSchema = void 0;
const path_1 = require("path");
const zod_1 = require("zod");
const fs_1 = require("../fs/fs");
exports.configSchema = (0, zod_1.object)({
    versionTagPrefix: (0, zod_1.string)().optional(),
    breakingChangeTitle: (0, zod_1.string)().optional(),
    featureTitle: (0, zod_1.string)().optional(),
    fixTitle: (0, zod_1.string)().optional(),
    title: (0, zod_1.string)().optional(),
}).passthrough();
exports.BASE_CONFIG = {
    breakingChangeTitle: '### ⚠ BREAKING CHANGES',
    featureTitle: '### Features',
    fixTitle: '### Bug Fixes',
    title: '# CHANGELOG',
    versionTagPrefix: 'v',
};
const getConfig = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (configName = 'slr.json') {
    const path = (0, path_1.join)(process.cwd(), configName);
    try {
        let file = yield fs_1.FsUtils.tryReadJson(path);
        file = exports.configSchema.parse(file);
        return Object.assign(Object.assign({}, exports.BASE_CONFIG), file);
    }
    catch (error) {
        if (configName !== 'slr.json') {
            console.warn(`Missing config: ${configName}`);
        }
        return Object.assign({}, exports.BASE_CONFIG);
    }
});
exports.getConfig = getConfig;
