// Функция для фильтрации коммитов, содержащих BREAKING CHANGE:

export const getShortCommitHash = (commit: string) => {
	return (
		commit
			.match(/commit (.+)\n/)
			?.toString()
			.split(',')[1] || ''
	).slice(0, 7);
};
export const getCommitsWithBreakingChanges = (commits: string[]) => {
	const regExp = / {4}BREAKING CHANGE:/;
	const matchRegExp = / {4}BREAKING CHANGE:[\s\S]+/;
	const currentCommits = commits.filter((commit) => commit.match(regExp));

	return currentCommits.map((item) => ({
		hash: getShortCommitHash(item),
		commit: item,
		shortDesc: item
			.match(matchRegExp)
			?.toString()
			.replace(regExp, '')
			.trim()
			.replace(/BREAKING CHANGE:/, '')
			.replace(/\n[\s\S]+/gim, '')
			.trim(),
	}));
};

export const getCommitsWithFeature = (commits: string[]) => {
	const regExp = / {4}feat:|^ {4}feat\(.+\):/;
	const matchRegExp = / {4}feat:[\s\S]+|^ {4}feat\(.+\):[\s\S]+/;
	const currentCommits = commits.filter((commit) => commit.match(regExp));
	return currentCommits.map((item) => ({
		hash: getShortCommitHash(item),
		commit: item,
		shortDesc: item
			.match(matchRegExp)
			?.toString()
			.replace(regExp, '')
			.trim()
			.replace(/BREAKING CHANGE:[\s\S]+/, '')
			.replace(/\n[\s\S]+/gim, '')
			.trim(),
	}));
};

export const getCommitsWithFix = (commits: string[]) => {
	const regExp = / {4}fix:|^ {4}fix\(.+\):/;
	const matchRegExp = / {4}fix:[\s\S]+|^ {4}fix\(.+\):[\s\S]+/;
	const currentCommits = commits.filter((commit) => commit.match(regExp));
	return currentCommits.map((item) => ({
		hash: getShortCommitHash(item),
		commit: item,
		shortDesc: item
			.match(matchRegExp)
			?.toString()
			.replace(regExp, '')
			.trim()
			.replace(/BREAKING CHANGE:[\s\S]+/, '')
			.replace(/\n[\s\S]+/gim, '')
			.trim(),
	}));
};
