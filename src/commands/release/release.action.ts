import { exec } from 'child_process';
import semver from 'semver';

import { SimpleLocalReleaseError } from '../../common/errors/simple-local-release-error';
import { getConfig } from '../../libs/config/get-config';
import { getPackageJsonVersion } from '../../libs/fs/get-package-json-version';
import { updatePackageJsonVersion } from '../../libs/fs/update-package-json-version';
import { getNextVersion } from '../../libs/get-next-version';
import { getCommits } from '../../libs/git/get-commits';
import { gitAdd, gitAddTag, gitCommit } from '../../libs/git/git';
import { updateChangelog } from '../../libs/update-changelog';
import { AbstractAction } from '../abstract/abstract.action';

export class ReleaseAction extends AbstractAction {
	public async handle(params?: { config: string }): Promise<void> {
		await releaseActionHandler(params);
	}
}

const fetchGit = () => {
	return new Promise((res) => {
		exec('git fetch && git pull', () => {
			res(null);
		});
	});
};

export const releaseActionHandler = async (params?: { config: string }, isFirstMajorRelease: boolean = false) => {
	await fetchGit();
	const config = await getConfig(params?.config);
	const currentVersion = await getPackageJsonVersion();
	const commits = await getCommits(config.versionTagPrefix!, currentVersion);
	const newVersion = isFirstMajorRelease ? '1.0.0' : await getNextVersion(commits, currentVersion);
	if (semver.lte(newVersion, currentVersion) && isFirstMajorRelease) {
		throw new SimpleLocalReleaseError(slrLocaleManager.get('errors.firstMajorReleaseAlreadyExist'));
	}

	await updatePackageJsonVersion(newVersion);
	await updateChangelog(commits, currentVersion, newVersion, config);
	await gitAdd();
	await gitCommit(`chore(release): ${newVersion}`);
	await gitAddTag(`${config.versionTagPrefix}${newVersion}`);
	logger.info(slrLocaleManager.get('success.release')(newVersion, `${config.versionTagPrefix}${newVersion}`));
};
