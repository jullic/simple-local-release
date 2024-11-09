import { SimpleLocalReleaseError } from '../../common/errors/simple-local-release-error';
import { asyncSpawnShellByPlatform, getOnlyOutData } from '../execute/spawn';
import { getCommitsFromString } from './get-commit-from-string';

export const getAllCommits = async (): Promise<string[]> => {
	try {
		const { data } = await asyncSpawnShellByPlatform(['git log']);
		const fullOutData = getOnlyOutData(data);

		return getCommitsFromString(fullOutData);
	} catch (error) {
		if (error instanceof Error) {
			throw new SimpleLocalReleaseError(error.message);
		}
		throw new Error('Error');
	}
};
