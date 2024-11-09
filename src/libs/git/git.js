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
exports.gitAddTag = exports.gitCommit = exports.gitAdd = void 0;
const spawn_1 = require("../execute/spawn");
const gitAdd = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (files = '.') {
    try {
        return (0, spawn_1.asyncSpawnShellByPlatform)([`cd ${process.cwd()} && git add ${files}`]);
    }
    catch (error) {
        return null;
    }
});
exports.gitAdd = gitAdd;
const gitCommit = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, spawn_1.asyncSpawnShellByPlatform)([`cd ${process.cwd()} && git commit -m "${message}"`]);
    }
    catch (error) {
        return null;
    }
});
exports.gitCommit = gitCommit;
const gitAddTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, spawn_1.asyncSpawnShellByPlatform)([`cd ${process.cwd()} && git tag -f "${tag}" HEAD`]);
    }
    catch (error) {
        return null;
    }
});
exports.gitAddTag = gitAddTag;
