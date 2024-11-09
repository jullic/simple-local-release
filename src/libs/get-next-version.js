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
exports.getNextVersion = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const semver_1 = __importDefault(require("semver"));
const simple_local_release_error_1 = require("../common/errors/simple-local-release-error");
const get_commits_with_type_1 = require("./git/get-commits-with-type");
const getNextVersion = (commits, currentVersion) => __awaiter(void 0, void 0, void 0, function* () {
    const isLessThenFirstRelease = semver_1.default.lt(currentVersion, '1.0.0');
    const isReleaseWithBreakingChange = (0, get_commits_with_type_1.getCommitsWithBreakingChanges)(commits).length !== 0;
    const isReleaseWithFeatures = (0, get_commits_with_type_1.getCommitsWithFeature)(commits).length !== 0;
    const isReleaseWithFixes = (0, get_commits_with_type_1.getCommitsWithFix)(commits).length !== 0;
    let newVersion = currentVersion;
    if (isLessThenFirstRelease) {
        newVersion =
            isReleaseWithBreakingChange || isReleaseWithFeatures
                ? semver_1.default.inc(newVersion, 'minor')
                : isReleaseWithFixes
                    ? semver_1.default.inc(newVersion, 'patch')
                    : newVersion;
    }
    else {
        newVersion = isReleaseWithBreakingChange
            ? semver_1.default.inc(newVersion, 'major')
            : isReleaseWithFeatures
                ? semver_1.default.inc(newVersion, 'minor')
                : isReleaseWithFixes
                    ? semver_1.default.inc(newVersion, 'patch')
                    : newVersion;
    }
    if (!isReleaseWithBreakingChange && !isReleaseWithFeatures && !isReleaseWithFeatures && !isReleaseWithFixes) {
        const { confirm } = yield inquirer_1.default.prompt([
            { message: slrLocaleManager.get('questions.missingCommits'), type: 'confirm', default: false, name: 'confirm' },
        ]);
        if (!confirm) {
            process.exit(0);
        }
        newVersion = semver_1.default.inc(currentVersion, 'patch') || newVersion;
    }
    if (!newVersion) {
        throw new simple_local_release_error_1.SimpleLocalReleaseError(slrLocaleManager.get('errors.incorrectVersion'));
    }
    if (newVersion === currentVersion) {
        throw new Error(slrLocaleManager.get('questions.missingCommits'));
    }
    return newVersion;
});
exports.getNextVersion = getNextVersion;
