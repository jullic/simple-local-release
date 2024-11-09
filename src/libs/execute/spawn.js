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
exports.getOnlyErrData = exports.getOnlyOutData = exports.asyncSpawnShellByPlatform = exports.asyncSpawn = void 0;
const child_process_1 = require("child_process");
const os_1 = require("os");
const asyncSpawn = (command, args, options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => {
        var _a, _b;
        const childProcess = (0, child_process_1.spawn)(command, args, Object.assign({}, options));
        const data = [];
        (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (chunk) => data.push({ chunk: chunk.toString(), type: 'out' }));
        (_b = childProcess.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (chunk) => data.push({ chunk: chunk.toString(), type: 'err' }));
        childProcess.on('close', (code) => {
            if (code !== 0) {
                const err = new Error(data
                    .filter((item) => item.type === 'err')
                    .map((item) => item.chunk)
                    .join(''));
                return rej(err);
            }
            res({ data });
        });
        childProcess.on('error', (err) => {
            rej(new Error(`${command} ${args.join(' ')}\n\n` + err.message));
        });
    });
});
exports.asyncSpawn = asyncSpawn;
const asyncSpawnShellByPlatform = (args, options) => __awaiter(void 0, void 0, void 0, function* () {
    const isWin = (0, os_1.platform)() === 'win32';
    if (isWin) {
        return yield (0, exports.asyncSpawn)('cmd', ['/c', ...args], options);
    }
    //
    return yield (0, exports.asyncSpawn)('sh', ['-c', ...args], options);
});
exports.asyncSpawnShellByPlatform = asyncSpawnShellByPlatform;
const getOnlyOutData = (data) => {
    return data
        .filter((item) => item.type === 'out')
        .map((item) => item.chunk)
        .join('');
};
exports.getOnlyOutData = getOnlyOutData;
const getOnlyErrData = (data) => {
    return data
        .filter((item) => item.type === 'err')
        .map((item) => item.chunk)
        .join('');
};
exports.getOnlyErrData = getOnlyErrData;
