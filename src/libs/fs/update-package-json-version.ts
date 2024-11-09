import { writeJson } from 'fs-extra';
import { join } from 'path';

import { FsUtils } from './fs';

export const updatePackageJsonVersion = async (version: string) => {
	try {
		const path = join(process.cwd(), 'package.json');
		const json = await FsUtils.tryReadJson(path);
		await writeJson(path, { ...json, version }, { spaces: '\t' });
	} catch (error) {
		throw new Error('Missing package.json');
	}
};
