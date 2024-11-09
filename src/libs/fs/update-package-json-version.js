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
exports.updatePackageJsonVersion = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const fs_1 = require("./fs");
const updatePackageJsonVersion = (version) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const path = (0, path_1.join)(process.cwd(), 'package.json');
        const json = yield fs_1.FsUtils.tryReadJson(path);
        yield (0, fs_extra_1.writeJson)(path, Object.assign(Object.assign({}, json), { version }), { spaces: '\t' });
    }
    catch (error) {
        throw new Error('Missing package.json');
    }
});
exports.updatePackageJsonVersion = updatePackageJsonVersion;
