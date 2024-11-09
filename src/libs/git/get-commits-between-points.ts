import { SimpleLocalReleaseError } from '../../common/errors/simple-local-release-error';
import { asyncSpawnShellByPlatform, getOnlyOutData } from '../execute/spawn';
import { getCommitsFromString } from './get-commit-from-string';

// Функция для получения коммитов между двумя тегами
export const getCommitsBetweenPoints = async (point1: string, point2: string): Promise<string[]> => {
	try {
		const { data } = await asyncSpawnShellByPlatform([`git log ${point1}..${point2}`]);
		const fullOutData = getOnlyOutData(data);

		return getCommitsFromString(fullOutData);
	} catch (error) {
		if (error instanceof Error) {
			throw new SimpleLocalReleaseError(error.message);
		}
		throw new Error('Error');
	}
};
