/// <reference types="node" />
import { SpawnOptions, SpawnOptionsWithoutStdio } from 'child_process';
type Data = {
    chunk: string;
    type: 'err' | 'out';
}[];
export declare const asyncSpawn: (command: string, args: readonly string[], options?: SpawnOptionsWithoutStdio | SpawnOptions) => Promise<{
    data: Data;
}>;
export declare const asyncSpawnShellByPlatform: (args: readonly string[], options?: SpawnOptionsWithoutStdio | SpawnOptions) => Promise<{
    data: Data;
}>;
export declare const getOnlyOutData: (data: Data) => string;
export declare const getOnlyErrData: (data: Data) => string;
export {};
