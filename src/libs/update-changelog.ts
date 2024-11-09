/* eslint-disable no-useless-escape */
import { readFile, writeFile } from 'fs-extra';
import { join } from 'path';

import { ConfigSchema } from './config/get-config';
import { getCommitsWithBreakingChanges, getCommitsWithFeature, getCommitsWithFix } from './git/get-commits-with-type';

const changeLogPath = join(process.cwd(), 'CHANGELOG.md');

const getChangelog = async () => {
	try {
		return (await readFile(changeLogPath)).toString();
	} catch (error) {
		return null;
	}
};

const updateChangelogFile = async (newData: string) => {
	try {
		await writeFile(changeLogPath, newData);
	} catch (error) {
		throw new Error();
	}
};

export const updateChangelog = async (commits: string[], prevVersion: string, newVersion: string, config: ConfigSchema) => {
	const breakingChangeCommits = getCommitsWithBreakingChanges(commits);
	const featuresCommits = getCommitsWithFeature(commits);
	const fixesCommits = getCommitsWithFix(commits);

	const breakingChanges = breakingChangeCommits.map((c) => `(${c.hash}) ${c.shortDesc}`);
	const features = featuresCommits.map((c) => `(${c.hash}) ${c.shortDesc}`);
	const fixes = fixesCommits.map((c) => `(${c.hash}) ${c.shortDesc}`);

	const releaseString = `## [${newVersion}](///compare/${config.versionTagPrefix}${prevVersion}...${config.versionTagPrefix}${newVersion}) (${new Date().toLocaleString()})`;
	const breakingChangesString = breakingChanges.length ? `${config.breakingChangeTitle}\n\n` + breakingChanges.join('\n') + '\n\n' : '';
	const featuresString = features.length ? `${config.featureTitle}\n\n` + features.join('\n') + '\n\n' : '';
	const fixesString = fixes.length ? `${config.fixTitle}\n\n` + fixes.join('\n') + '\n\n' : '';

	const payloadData = `${breakingChangesString}${featuresString}${fixesString}`;

	const newVersionChangelog = `${releaseString}\n\n${payloadData.trim()}`;

	const currentChangelog = await getChangelog();
	const currentChangelogLines = currentChangelog?.split('\n');
	const currentChangelogTitle = config.title; // '# CHANGELOG'

	const lastVersionIndex = currentChangelogLines?.findIndex((el) => el.match(/## \[\d.\d.\d\]\(/));
	const currentChangelogWithoutTitle = currentChangelogLines?.slice(lastVersionIndex ? lastVersionIndex : undefined).join('\n');
	const newChangelogVersions = `${newVersionChangelog}\n\n\n${currentChangelogWithoutTitle ? currentChangelogWithoutTitle?.trim() : ''}`;

	const newChangelog = `${currentChangelogTitle}\n\n${newChangelogVersions.trim()}`;

	await updateChangelogFile(newChangelog);
};
