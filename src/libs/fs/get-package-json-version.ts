import { join } from 'path';

import { FsUtils } from './fs';

export const getPackageJsonVersion = async () => {
	try {
		const path = join(process.cwd(), 'package.json');
		const json = (await FsUtils.tryReadJson(path)) as { version: string };
		return json.version as string;
	} catch (error) {
		throw new Error('Missing package.json');
	}
};
