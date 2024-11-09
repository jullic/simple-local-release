import semver from 'semver';

import { SimpleLocalReleaseError } from '../../common/errors/simple-local-release-error';
import { getAllCommits } from './get-all-commits';
import { getAllVersionGitTags } from './get-all-version-git-tags';
import { getCommitsBetweenPoints } from './get-commits-between-points';

export const getCommits = async (versionTagPrefix: string, currentVersion: string) => {
	const versionTags = (await getAllVersionGitTags(versionTagPrefix || '')).sort(semver.compare);
	let commits: string[] = [];
	if (versionTags.length) {
		try {
			commits = await getCommitsBetweenPoints(`${versionTagPrefix}${currentVersion}`, 'HEAD');
		} catch (error) {
			throw new SimpleLocalReleaseError(slrLocaleManager.get('errors.incorrectVersion'));
		}
	} else {
		commits = await getAllCommits();
	}
	if (commits.length === 0) {
		throw new SimpleLocalReleaseError(slrLocaleManager.get('errors.missingCommits'));
	}

	return commits;
};
