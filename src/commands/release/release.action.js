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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseActionHandler = exports.ReleaseAction = void 0;
const child_process_1 = require("child_process");
const semver_1 = __importDefault(require("semver"));
const simple_local_release_error_1 = require("../../common/errors/simple-local-release-error");
const get_config_1 = require("../../libs/config/get-config");
const get_package_json_version_1 = require("../../libs/fs/get-package-json-version");
const update_package_json_version_1 = require("../../libs/fs/update-package-json-version");
const get_next_version_1 = require("../../libs/get-next-version");
const get_commits_1 = require("../../libs/git/get-commits");
const git_1 = require("../../libs/git/git");
const update_changelog_1 = require("../../libs/update-changelog");
const abstract_action_1 = require("../abstract/abstract.action");
class ReleaseAction extends abstract_action_1.AbstractAction {
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, exports.releaseActionHandler)(params);
        });
    }
}
exports.ReleaseAction = ReleaseAction;
const fetchGit = () => {
    return new Promise((res) => {
        (0, child_process_1.exec)('git fetch && git pull', () => {
            res(null);
        });
    });
};
const releaseActionHandler = (params_1, ...args_1) => __awaiter(void 0, [params_1, ...args_1], void 0, function* (params, isFirstMajorRelease = false) {
    yield fetchGit();
    const config = yield (0, get_config_1.getConfig)(params === null || params === void 0 ? void 0 : params.config);
    const currentVersion = yield (0, get_package_json_version_1.getPackageJsonVersion)();
    const commits = yield (0, get_commits_1.getCommits)(config.versionTagPrefix, currentVersion);
    const newVersion = isFirstMajorRelease ? '1.0.0' : yield (0, get_next_version_1.getNextVersion)(commits, currentVersion);
    if (semver_1.default.lte(newVersion, currentVersion) && isFirstMajorRelease) {
        throw new simple_local_release_error_1.SimpleLocalReleaseError(slrLocaleManager.get('errors.firstMajorReleaseAlreadyExist'));
    }
    yield (0, update_package_json_version_1.updatePackageJsonVersion)(newVersion);
    yield (0, update_changelog_1.updateChangelog)(commits, currentVersion, newVersion, config);
    yield (0, git_1.gitAdd)();
    yield (0, git_1.gitCommit)(`chore(release): ${newVersion}`);
    yield (0, git_1.gitAddTag)(`${config.versionTagPrefix}${newVersion}`);
    logger.info(slrLocaleManager.get('success.release')(newVersion, `${config.versionTagPrefix}${newVersion}`));
});
exports.releaseActionHandler = releaseActionHandler;
