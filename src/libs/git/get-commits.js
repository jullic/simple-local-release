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
exports.getCommits = void 0;
const semver_1 = __importDefault(require("semver"));
const simple_local_release_error_1 = require("../../common/errors/simple-local-release-error");
const get_all_commits_1 = require("./get-all-commits");
const get_all_version_git_tags_1 = require("./get-all-version-git-tags");
const get_commits_between_points_1 = require("./get-commits-between-points");
const getCommits = (versionTagPrefix, currentVersion) => __awaiter(void 0, void 0, void 0, function* () {
    const versionTags = (yield (0, get_all_version_git_tags_1.getAllVersionGitTags)(versionTagPrefix || '')).sort(semver_1.default.compare);
    let commits = [];
    if (versionTags.length) {
        try {
            commits = yield (0, get_commits_between_points_1.getCommitsBetweenPoints)(`${versionTagPrefix}${currentVersion}`, 'HEAD');
        }
        catch (error) {
            throw new simple_local_release_error_1.SimpleLocalReleaseError(slrLocaleManager.get('errors.incorrectVersion'));
        }
    }
    else {
        commits = yield (0, get_all_commits_1.getAllCommits)();
    }
    if (commits.length === 0) {
        throw new simple_local_release_error_1.SimpleLocalReleaseError(slrLocaleManager.get('errors.missingCommits'));
    }
    return commits;
});
exports.getCommits = getCommits;
