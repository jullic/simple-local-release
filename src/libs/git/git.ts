import { asyncSpawnShellByPlatform } from '../execute/spawn';

export const gitAdd = async (files: string = '.') => {
	try {
		return asyncSpawnShellByPlatform([`cd ${process.cwd()} && git add ${files}`]);
	} catch (error) {
		return null;
	}
};

export const gitCommit = async (message: string) => {
	try {
		return asyncSpawnShellByPlatform([`cd ${process.cwd()} && git commit -m "${message}"`]);
	} catch (error) {
		return null;
	}
};

export const gitAddTag = async (tag: string) => {
	try {
		return asyncSpawnShellByPlatform([`cd ${process.cwd()} && git tag -f "${tag}" HEAD`]);
	} catch (error) {
		return null;
	}
};
