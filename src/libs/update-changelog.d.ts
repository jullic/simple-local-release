import { ConfigSchema } from './config/get-config';
export declare const updateChangelog: (commits: string[], prevVersion: string, newVersion: string, config: ConfigSchema) => Promise<void>;
