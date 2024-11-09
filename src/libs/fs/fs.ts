import { copy, readdir, readFileSync, readJSON, readJSONSync, stat, statSync } from 'fs-extra';
import { join } from 'path';

export const getFileData = async (path: string) => {
	try {
		return (await readFileSync(path)).toString();
	} catch (error) {
		return null;
	}
};

export const isFile = async (path: string) => {
	try {
		const st = await stat(path);
		return st.isFile();
	} catch (error) {
		return false;
	}
};

export const isFolder = async (path: string) => {
	try {
		const st = await stat(path);
		return st.isDirectory();
	} catch (error) {
		return false;
	}
};

export const isExistPath = async (path: string) => {
	try {
		const st = await stat(path);
		return st.isDirectory() || st.isFile();
	} catch (error) {
		return false;
	}
};

export const getFolderList = async (path: string) => {
	try {
		return await readdir(path);
	} catch (error) {
		return null;
	}
};

export const getOnlyFoldersList = async (path: string) => {
	const list = await getFolderList(path);
	if (!list) {
		return null;
	}
	return list.filter((item) => {
		const st = statSync(join(path, item));
		return st.isDirectory();
	});
};

export const getOnlyFileList = async (path: string) => {
	const list = await getFolderList(path);
	if (!list) {
		return null;
	}
	return list.filter((item) => {
		const st = statSync(join(path, item));
		return st.isFile();
	});
};

export const remove = async (path: string) => {
	try {
		await remove(path);
		return true;
	} catch (error) {
		return false;
	}
};

export const tryReadJson = async <T extends Record<string, any> = Record<string, any>>(path: string) => {
	try {
		return (await readJSON(path)) as T;
	} catch (error) {
		return null;
	}
};
const tryReadJsonSync = <T extends Record<string, any> = Record<string, any>>(path: string) => {
	try {
		return readJSONSync(path) as T;
	} catch (error) {
		return null;
	}
};

export const copyFolderContent = async (src: string, dist: string) => {
	try {
		const folderData = (await getFolderList(src)) || [];

		for (const item of folderData) {
			const path = join(src, item);
			const out = join(dist, item);
			await copy(path, out);
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error();
	}
};

export const findAllPathsByName = async (
	basePath: string,
	name: string,
	excludesNames: string[] = ['dist', 'build', 'node_modules', '.git'],
) => {
	const list = await getFolderList(basePath);
	let paths: string[] = [];
	if (!list) {
		return paths;
	}
	for (const el of list) {
		const newPath = join(basePath, el);

		if (el === name) {
			paths.push(newPath);
		}
		if ((await isFolder(newPath)) && !excludesNames.includes(el)) {
			const newPaths = await findAllPathsByName(newPath, name, excludesNames);
			paths = [...paths, ...newPaths];
		}
	}

	return paths;
};

export const getAllPaths = async (basePath: string, exclude: (string | RegExp)[] = []) => {
	const list =
		(await getFolderList(basePath))?.filter((path) => {
			for (const item of exclude) {
				if ((item instanceof RegExp && path.match(item)) || path === item) {
					return false;
				}
			}
			return true;
		}) || [];
	let paths: string[] = [];
	if (list?.length === 0) {
		paths.push(basePath);
	}
	if (!list) {
		return paths;
	}
	for (const el of list) {
		const newPath = join(basePath, el);
		if (await isFolder(newPath)) {
			paths = [...paths, ...(await getAllPaths(newPath, exclude))];
		} else {
			paths.push(newPath);
		}
	}

	return paths;
};

export const getAllPathsByFileTemplate = async (basePath: string, template: string) => {
	const list = await getFolderList(basePath);
	let paths: string[] = [];
	if (!list) {
		return paths;
	}

	for (const el of list) {
		const newPath = join(basePath, el);
		if ((await isFile(newPath)) && el.toLowerCase().match(template.toLowerCase())) {
			paths.push(newPath);
		} else if (await isFolder(newPath)) {
			paths = [...paths, ...(await getAllPathsByFileTemplate(newPath, template))];
		}
	}
	return paths;
};

export class FsUtils {
	static getFileData = getFileData;
	static isFile = isFile;
	static isFolder = isFolder;
	static isExistPath = isExistPath;
	static getFolderList = getFolderList;
	static getOnlyFoldersList = getOnlyFoldersList;
	static getOnlyFileList = getOnlyFileList;
	static remove = remove;
	static tryReadJson = tryReadJson;
	static copyFolderContent = copyFolderContent;
	static findAllPathsByName = findAllPathsByName;
	static getAllPaths = getAllPaths;
	static getAllPathsByFileTemplate = getAllPathsByFileTemplate;
}
