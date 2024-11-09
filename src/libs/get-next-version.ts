import inquirer from 'inquirer';
import semver from 'semver';

import { SimpleLocalReleaseError } from '../common/errors/simple-local-release-error';
import { getCommitsWithBreakingChanges, getCommitsWithFeature, getCommitsWithFix } from './git/get-commits-with-type';

export const getNextVersion = async (commits: string[], currentVersion: string) => {
	const isLessThenFirstRelease = semver.lt(currentVersion, '1.0.0');
	const isReleaseWithBreakingChange = getCommitsWithBreakingChanges(commits).length !== 0;
	const isReleaseWithFeatures = getCommitsWithFeature(commits).length !== 0;
	const isReleaseWithFixes = getCommitsWithFix(commits).length !== 0;

	let newVersion = currentVersion;

	if (isLessThenFirstRelease) {
		newVersion =
			isReleaseWithBreakingChange || isReleaseWithFeatures
				? semver.inc(newVersion, 'minor')!
				: isReleaseWithFixes
					? semver.inc(newVersion, 'patch')!
					: newVersion;
	} else {
		newVersion = isReleaseWithBreakingChange
			? semver.inc(newVersion, 'major')!
			: isReleaseWithFeatures
				? semver.inc(newVersion, 'minor')!
				: isReleaseWithFixes
					? semver.inc(newVersion, 'patch')!
					: newVersion;
	}

	if (!isReleaseWithBreakingChange && !isReleaseWithFeatures && !isReleaseWithFeatures && !isReleaseWithFixes) {
		const { confirm } = await inquirer.prompt([
			{ message: slrLocaleManager.get('questions.missingCommits'), type: 'confirm', default: false, name: 'confirm' },
		]);
		if (!confirm) {
			process.exit(0);
		}

		newVersion = semver.inc(currentVersion, 'patch') || newVersion;
	}

	if (!newVersion) {
		throw new SimpleLocalReleaseError(slrLocaleManager.get('errors.incorrectVersion'));
	}

	if (newVersion === currentVersion) {
		throw new Error(slrLocaleManager.get('questions.missingCommits'));
	}

	return newVersion;
};
