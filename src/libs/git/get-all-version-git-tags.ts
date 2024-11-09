import { SimpleLocalReleaseError } from '../../common/errors/simple-local-release-error';
import { asyncSpawnShellByPlatform, getOnlyOutData } from '../execute/spawn';

export const getAllVersionGitTags = async (prefix: string): Promise<string[]> => {
	try {
		const { data } = await asyncSpawnShellByPlatform([`git tag`]);
		const fullOutData = getOnlyOutData(data);

		return fullOutData
			.split('\n')
			.filter((tag) => tag.length > 0)
			.filter((item) => item.match(new RegExp(`${prefix}\\d.\\d.\\d`)));
	} catch (error) {
		if (error instanceof Error) {
			throw new SimpleLocalReleaseError(error.message);
		}
		throw new Error('Error');
	}
};
