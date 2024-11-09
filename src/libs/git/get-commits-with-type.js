"use strict";
// Функция для фильтрации коммитов, содержащих BREAKING CHANGE:
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitsWithFix = exports.getCommitsWithFeature = exports.getCommitsWithBreakingChanges = exports.getShortCommitHash = void 0;
const getShortCommitHash = (commit) => {
    var _a;
    return (((_a = commit
        .match(/commit (.+)\n/)) === null || _a === void 0 ? void 0 : _a.toString().split(',')[1]) || '').slice(0, 7);
};
exports.getShortCommitHash = getShortCommitHash;
const getCommitsWithBreakingChanges = (commits) => {
    const regExp = / {4}BREAKING CHANGE:/;
    const matchRegExp = / {4}BREAKING CHANGE:[\s\S]+/;
    const currentCommits = commits.filter((commit) => commit.match(regExp));
    return currentCommits.map((item) => {
        var _a;
        return ({
            hash: (0, exports.getShortCommitHash)(item),
            commit: item,
            shortDesc: (_a = item
                .match(matchRegExp)) === null || _a === void 0 ? void 0 : _a.toString().replace(regExp, '').trim().replace(/BREAKING CHANGE:/, '').replace(/\n[\s\S]+/gim, '').trim(),
        });
    });
};
exports.getCommitsWithBreakingChanges = getCommitsWithBreakingChanges;
const getCommitsWithFeature = (commits) => {
    const regExp = / {4}feat:|^ {4}feat\(.+\):/;
    const matchRegExp = / {4}feat:[\s\S]+|^ {4}feat\(.+\):[\s\S]+/;
    const currentCommits = commits.filter((commit) => commit.match(regExp));
    return currentCommits.map((item) => {
        var _a;
        return ({
            hash: (0, exports.getShortCommitHash)(item),
            commit: item,
            shortDesc: (_a = item
                .match(matchRegExp)) === null || _a === void 0 ? void 0 : _a.toString().replace(regExp, '').trim().replace(/BREAKING CHANGE:[\s\S]+/, '').replace(/\n[\s\S]+/gim, '').trim(),
        });
    });
};
exports.getCommitsWithFeature = getCommitsWithFeature;
const getCommitsWithFix = (commits) => {
    const regExp = / {4}fix:|^ {4}fix\(.+\):/;
    const matchRegExp = / {4}fix:[\s\S]+|^ {4}fix\(.+\):[\s\S]+/;
    const currentCommits = commits.filter((commit) => commit.match(regExp));
    return currentCommits.map((item) => {
        var _a;
        return ({
            hash: (0, exports.getShortCommitHash)(item),
            commit: item,
            shortDesc: (_a = item
                .match(matchRegExp)) === null || _a === void 0 ? void 0 : _a.toString().replace(regExp, '').trim().replace(/BREAKING CHANGE:[\s\S]+/, '').replace(/\n[\s\S]+/gim, '').trim(),
        });
    });
};
exports.getCommitsWithFix = getCommitsWithFix;
