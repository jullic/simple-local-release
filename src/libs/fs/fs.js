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
exports.FsUtils = exports.getAllPathsByFileTemplate = exports.getAllPaths = exports.findAllPathsByName = exports.copyFolderContent = exports.tryReadJson = exports.remove = exports.getOnlyFileList = exports.getOnlyFoldersList = exports.getFolderList = exports.isExistPath = exports.isFolder = exports.isFile = exports.getFileData = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const getFileData = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, fs_extra_1.readFileSync)(path)).toString();
    }
    catch (error) {
        return null;
    }
});
exports.getFileData = getFileData;
const isFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const st = yield (0, fs_extra_1.stat)(path);
        return st.isFile();
    }
    catch (error) {
        return false;
    }
});
exports.isFile = isFile;
const isFolder = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const st = yield (0, fs_extra_1.stat)(path);
        return st.isDirectory();
    }
    catch (error) {
        return false;
    }
});
exports.isFolder = isFolder;
const isExistPath = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const st = yield (0, fs_extra_1.stat)(path);
        return st.isDirectory() || st.isFile();
    }
    catch (error) {
        return false;
    }
});
exports.isExistPath = isExistPath;
const getFolderList = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, fs_extra_1.readdir)(path);
    }
    catch (error) {
        return null;
    }
});
exports.getFolderList = getFolderList;
const getOnlyFoldersList = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield (0, exports.getFolderList)(path);
    if (!list) {
        return null;
    }
    return list.filter((item) => {
        const st = (0, fs_extra_1.statSync)((0, path_1.join)(path, item));
        return st.isDirectory();
    });
});
exports.getOnlyFoldersList = getOnlyFoldersList;
const getOnlyFileList = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield (0, exports.getFolderList)(path);
    if (!list) {
        return null;
    }
    return list.filter((item) => {
        const st = (0, fs_extra_1.statSync)((0, path_1.join)(path, item));
        return st.isFile();
    });
});
exports.getOnlyFileList = getOnlyFileList;
const remove = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.remove)(path);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.remove = remove;
const tryReadJson = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, fs_extra_1.readJSON)(path));
    }
    catch (error) {
        return null;
    }
});
exports.tryReadJson = tryReadJson;
const tryReadJsonSync = (path) => {
    try {
        return (0, fs_extra_1.readJSONSync)(path);
    }
    catch (error) {
        return null;
    }
};
const copyFolderContent = (src, dist) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderData = (yield (0, exports.getFolderList)(src)) || [];
        for (const item of folderData) {
            const path = (0, path_1.join)(src, item);
            const out = (0, path_1.join)(dist, item);
            yield (0, fs_extra_1.copy)(path, out);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error();
    }
});
exports.copyFolderContent = copyFolderContent;
const findAllPathsByName = (basePath_1, name_1, ...args_1) => __awaiter(void 0, [basePath_1, name_1, ...args_1], void 0, function* (basePath, name, excludesNames = ['dist', 'build', 'node_modules', '.git']) {
    const list = yield (0, exports.getFolderList)(basePath);
    let paths = [];
    if (!list) {
        return paths;
    }
    for (const el of list) {
        const newPath = (0, path_1.join)(basePath, el);
        if (el === name) {
            paths.push(newPath);
        }
        if ((yield (0, exports.isFolder)(newPath)) && !excludesNames.includes(el)) {
            const newPaths = yield (0, exports.findAllPathsByName)(newPath, name, excludesNames);
            paths = [...paths, ...newPaths];
        }
    }
    return paths;
});
exports.findAllPathsByName = findAllPathsByName;
const getAllPaths = (basePath_2, ...args_2) => __awaiter(void 0, [basePath_2, ...args_2], void 0, function* (basePath, exclude = []) {
    var _a;
    const list = ((_a = (yield (0, exports.getFolderList)(basePath))) === null || _a === void 0 ? void 0 : _a.filter((path) => {
        for (const item of exclude) {
            if ((item instanceof RegExp && path.match(item)) || path === item) {
                return false;
            }
        }
        return true;
    })) || [];
    let paths = [];
    if ((list === null || list === void 0 ? void 0 : list.length) === 0) {
        paths.push(basePath);
    }
    if (!list) {
        return paths;
    }
    for (const el of list) {
        const newPath = (0, path_1.join)(basePath, el);
        if (yield (0, exports.isFolder)(newPath)) {
            paths = [...paths, ...(yield (0, exports.getAllPaths)(newPath, exclude))];
        }
        else {
            paths.push(newPath);
        }
    }
    return paths;
});
exports.getAllPaths = getAllPaths;
const getAllPathsByFileTemplate = (basePath, template) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield (0, exports.getFolderList)(basePath);
    let paths = [];
    if (!list) {
        return paths;
    }
    for (const el of list) {
        const newPath = (0, path_1.join)(basePath, el);
        if ((yield (0, exports.isFile)(newPath)) && el.toLowerCase().match(template.toLowerCase())) {
            paths.push(newPath);
        }
        else if (yield (0, exports.isFolder)(newPath)) {
            paths = [...paths, ...(yield (0, exports.getAllPathsByFileTemplate)(newPath, template))];
        }
    }
    return paths;
});
exports.getAllPathsByFileTemplate = getAllPathsByFileTemplate;
class FsUtils {
}
exports.FsUtils = FsUtils;
FsUtils.getFileData = exports.getFileData;
FsUtils.isFile = exports.isFile;
FsUtils.isFolder = exports.isFolder;
FsUtils.isExistPath = exports.isExistPath;
FsUtils.getFolderList = exports.getFolderList;
FsUtils.getOnlyFoldersList = exports.getOnlyFoldersList;
FsUtils.getOnlyFileList = exports.getOnlyFileList;
FsUtils.remove = exports.remove;
FsUtils.tryReadJson = exports.tryReadJson;
FsUtils.copyFolderContent = exports.copyFolderContent;
FsUtils.findAllPathsByName = exports.findAllPathsByName;
FsUtils.getAllPaths = exports.getAllPaths;
FsUtils.getAllPathsByFileTemplate = exports.getAllPathsByFileTemplate;
