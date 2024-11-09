export declare const getFileData: (path: string) => Promise<string | null>;
export declare const isFile: (path: string) => Promise<boolean>;
export declare const isFolder: (path: string) => Promise<boolean>;
export declare const isExistPath: (path: string) => Promise<boolean>;
export declare const getFolderList: (path: string) => Promise<string[] | null>;
export declare const getOnlyFoldersList: (path: string) => Promise<string[] | null>;
export declare const getOnlyFileList: (path: string) => Promise<string[] | null>;
export declare const remove: (path: string) => Promise<boolean>;
export declare const tryReadJson: <T extends Record<string, any> = Record<string, any>>(path: string) => Promise<T | null>;
export declare const copyFolderContent: (src: string, dist: string) => Promise<void>;
export declare const findAllPathsByName: (basePath: string, name: string, excludesNames?: string[]) => Promise<string[]>;
export declare const getAllPaths: (basePath: string, exclude?: (string | RegExp)[]) => Promise<string[]>;
export declare const getAllPathsByFileTemplate: (basePath: string, template: string) => Promise<string[]>;
export declare class FsUtils {
    static getFileData: (path: string) => Promise<string | null>;
    static isFile: (path: string) => Promise<boolean>;
    static isFolder: (path: string) => Promise<boolean>;
    static isExistPath: (path: string) => Promise<boolean>;
    static getFolderList: (path: string) => Promise<string[] | null>;
    static getOnlyFoldersList: (path: string) => Promise<string[] | null>;
    static getOnlyFileList: (path: string) => Promise<string[] | null>;
    static remove: (path: string) => Promise<boolean>;
    static tryReadJson: <T extends Record<string, any> = Record<string, any>>(path: string) => Promise<T | null>;
    static copyFolderContent: (src: string, dist: string) => Promise<void>;
    static findAllPathsByName: (basePath: string, name: string, excludesNames?: string[]) => Promise<string[]>;
    static getAllPaths: (basePath: string, exclude?: (string | RegExp)[]) => Promise<string[]>;
    static getAllPathsByFileTemplate: (basePath: string, template: string) => Promise<string[]>;
}
