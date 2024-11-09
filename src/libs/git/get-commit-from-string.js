"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitsFromString = void 0;
const getCommitsFromString = (allCommits) => {
    return allCommits
        .split(/^commit/m)
        .filter((commit) => commit.length > 0)
        .map((item) => 'commit' + item);
};
exports.getCommitsFromString = getCommitsFromString;
