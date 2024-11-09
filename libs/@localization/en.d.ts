export declare class EN {
    questions: {
        missingCommits: string;
    };
    errors: {
        incorrectVersion: string;
        missingCommits: string;
        nextVersionAlreadyExistInGitTags: (version: string) => string;
        firstMajorReleaseAlreadyExist: string;
        currentVersionMoreThenFirstMajor: string;
        missingStagedChanges: string;
        noGitRepository: string;
    };
    success: {
        release: (newVersion: string, newGitTag: string) => string;
        nextVersion: (nextVersion: string) => string;
    };
    commit: {
        type: {
            feat: string;
            fix: string;
            docs: string;
            style: string;
            refactor: string;
            perf: string;
            test: string;
            build: string;
            ci: string;
            chore: string;
            revert: string;
        };
        questions: {
            scope: string;
            shortCommit: string;
            longDescription: string;
            haveBreakingChange: string;
            breakingChanges: string;
            haveIssue: string;
            issueReference: string;
        };
    };
}
