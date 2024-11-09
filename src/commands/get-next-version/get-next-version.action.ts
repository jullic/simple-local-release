import { getConfig } from '../../libs/config/get-config';
import { getPackageJsonVersion } from '../../libs/fs/get-package-json-version';
import { getNextVersion } from '../../libs/get-next-version';
import { getCommits } from '../../libs/git/get-commits';
import { AbstractAction } from '../abstract/abstract.action';

export class GetNextVersionAction extends AbstractAction {
	public async handle(params?: { config: string }): Promise<void> {
		await getNextVersionActionHandler(params);
	}
}

export const getNextVersionActionHandler = async (params?: { config: string }) => {
	const config = await getConfig(params?.config);
	const currentVersion = await getPackageJsonVersion();
	const commits = await getCommits(config.versionTagPrefix!, currentVersion);
	const newVersion = await getNextVersion(commits, currentVersion);
	logger.info(newVersion);
};
