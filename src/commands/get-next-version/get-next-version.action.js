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
exports.getNextVersionActionHandler = exports.GetNextVersionAction = void 0;
const get_config_1 = require("../../libs/config/get-config");
const get_package_json_version_1 = require("../../libs/fs/get-package-json-version");
const get_next_version_1 = require("../../libs/get-next-version");
const get_commits_1 = require("../../libs/git/get-commits");
const abstract_action_1 = require("../abstract/abstract.action");
class GetNextVersionAction extends abstract_action_1.AbstractAction {
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, exports.getNextVersionActionHandler)(params);
        });
    }
}
exports.GetNextVersionAction = GetNextVersionAction;
const getNextVersionActionHandler = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield (0, get_config_1.getConfig)(params === null || params === void 0 ? void 0 : params.config);
    const currentVersion = yield (0, get_package_json_version_1.getPackageJsonVersion)();
    const commits = yield (0, get_commits_1.getCommits)(config.versionTagPrefix, currentVersion);
    const newVersion = yield (0, get_next_version_1.getNextVersion)(commits, currentVersion);
    logger.info(newVersion);
});
exports.getNextVersionActionHandler = getNextVersionActionHandler;
