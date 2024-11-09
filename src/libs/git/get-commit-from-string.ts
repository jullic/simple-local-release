export const getCommitsFromString = (allCommits: string) => {
	return allCommits
		.split(/^commit/m)
		.filter((commit) => commit.length > 0)
		.map((item) => 'commit' + item);
};
