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
exports.updateChangelog = void 0;
/* eslint-disable no-useless-escape */
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const get_commits_with_type_1 = require("./git/get-commits-with-type");
const changeLogPath = (0, path_1.join)(process.cwd(), 'CHANGELOG.md');
const getChangelog = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, fs_extra_1.readFile)(changeLogPath)).toString();
    }
    catch (error) {
        return null;
    }
});
const updateChangelogFile = (newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, fs_extra_1.writeFile)(changeLogPath, newData);
    }
    catch (error) {
        throw new Error();
    }
});
const updateChangelog = (commits, prevVersion, newVersion, config) => __awaiter(void 0, void 0, void 0, function* () {
    const breakingChangeCommits = (0, get_commits_with_type_1.getCommitsWithBreakingChanges)(commits);
    const featuresCommits = (0, get_commits_with_type_1.getCommitsWithFeature)(commits);
    const fixesCommits = (0, get_commits_with_type_1.getCommitsWithFix)(commits);
    const breakingChanges = breakingChangeCommits.map((c) => `(${c.hash}) ${c.shortDesc}`);
    const features = featuresCommits.map((c) => `(${c.hash}) ${c.shortDesc}`);
    const fixes = fixesCommits.map((c) => `(${c.hash}) ${c.shortDesc}`);
    const releaseString = `## [${newVersion}](///compare/${config.versionTagPrefix}${prevVersion}...${config.versionTagPrefix}${newVersion}) (${new Date().toLocaleString()})`;
    const breakingChangesString = breakingChanges.length ? `${config.breakingChangeTitle}\n\n` + breakingChanges.join('\n') + '\n\n' : '';
    const featuresString = features.length ? `${config.featureTitle}\n\n` + features.join('\n') + '\n\n' : '';
    const fixesString = fixes.length ? `${config.fixTitle}\n\n` + fixes.join('\n') + '\n\n' : '';
    const payloadData = `${breakingChangesString}${featuresString}${fixesString}`;
    const newVersionChangelog = `${releaseString}\n\n${payloadData.trim()}`;
    const currentChangelog = yield getChangelog();
    const currentChangelogLines = currentChangelog === null || currentChangelog === void 0 ? void 0 : currentChangelog.split('\n');
    const currentChangelogTitle = config.title; // '# CHANGELOG'
    const lastVersionIndex = currentChangelogLines === null || currentChangelogLines === void 0 ? void 0 : currentChangelogLines.findIndex((el) => el.match(/## \[\d.\d.\d\]\(/));
    const currentChangelogWithoutTitle = currentChangelogLines === null || currentChangelogLines === void 0 ? void 0 : currentChangelogLines.slice(lastVersionIndex ? lastVersionIndex : undefined).join('\n');
    const newChangelogVersions = `${newVersionChangelog}\n\n\n${currentChangelogWithoutTitle ? currentChangelogWithoutTitle === null || currentChangelogWithoutTitle === void 0 ? void 0 : currentChangelogWithoutTitle.trim() : ''}`;
    const newChangelog = `${currentChangelogTitle}\n\n${newChangelogVersions.trim()}`;
    yield updateChangelogFile(newChangelog);
});
exports.updateChangelog = updateChangelog;
