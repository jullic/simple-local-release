export declare const getShortCommitHash: (commit: string) => string;
export declare const getCommitsWithBreakingChanges: (commits: string[]) => {
    hash: string;
    commit: string;
    shortDesc: string | undefined;
}[];
export declare const getCommitsWithFeature: (commits: string[]) => {
    hash: string;
    commit: string;
    shortDesc: string | undefined;
}[];
export declare const getCommitsWithFix: (commits: string[]) => {
    hash: string;
    commit: string;
    shortDesc: string | undefined;
}[];
