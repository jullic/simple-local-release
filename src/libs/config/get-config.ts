import { join } from 'path';
import z, { object, string } from 'zod';

import { FsUtils } from '../fs/fs';

export const configSchema = object({
	versionTagPrefix: string().optional(),
	breakingChangeTitle: string().optional(),
	featureTitle: string().optional(),
	fixTitle: string().optional(),
	title: string().optional(),
}).passthrough();

export type ConfigSchema = z.infer<typeof configSchema>;

export const BASE_CONFIG: ConfigSchema = {
	breakingChangeTitle: '### ⚠ BREAKING CHANGES',
	featureTitle: '### Features',
	fixTitle: '### Bug Fixes',
	title: '# CHANGELOG',
	versionTagPrefix: 'v',
};

export const getConfig = async (configName: string = 'slr.json') => {
	const path = join(process.cwd(), configName);
	try {
		let file = await FsUtils.tryReadJson<ConfigSchema>(path);
		file = configSchema.parse(file);
		return { ...BASE_CONFIG, ...file };
	} catch (error) {
		if (configName !== 'slr.json') {
			console.warn(`Missing config: ${configName}`);
		}
		return { ...BASE_CONFIG };
	}
};
