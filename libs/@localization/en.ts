export class EN {
	questions = {
		missingCommits: 'Missing fix or features commits. Continue?',
	};
	errors = {
		incorrectVersion: 'Incorrect version',
		missingCommits: 'Missing fix or features commits',
		nextVersionAlreadyExistInGitTags: (version: string) => `Next version: ${version} already exist in git tags`,
		firstMajorReleaseAlreadyExist: 'First major release already exist',
		currentVersionMoreThenFirstMajor: 'Current version is more than 1.0.0',
		missingStagedChanges: 'Missing staged changes',
		noGitRepository: 'No git repository',
	};
	success = {
		release: (newVersion: string, newGitTag: string) => `New version: ${newVersion}\nNew git tag: ${newGitTag}\nUpdated CHANGELOG`,
		nextVersion: (nextVersion: string) => `${nextVersion}`,
	};
	commit = {
		// type
		type: {
			feat: 'feat:     A new feature',
			fix: 'fix:      A bug fix',
			docs: 'docs:     Documentation only changes',
			style: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
			refactor: 'refactor: A code change that neither fixes a bug nor adds a feature',
			perf: 'perf:     A code change that improves performance',
			test: 'test:     Adding missing tests or correcting existing tests',
			build: 'build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
			ci: 'ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
			chore: "chore:    Other changes that don't modify src or test files",
			revert: 'revert:   Reverts a previous commit',
		},
		// type
		questions: {
			scope: 'What is the scope of this change (e.g. component or file name):',
			shortCommit: 'Write a short, imperative tense description of the change (max 88 chars):',
			longDescription: 'Provide a longer description of the change:',
			haveBreakingChange: 'Are there any breaking changes?',
			breakingChanges: 'Describe the breaking changes:',
			haveIssue: 'Does this change affect any open issues?',
			issueReference: 'Add issue references (e.g. "fix #123", "re #123".):',
		},
	};
}
