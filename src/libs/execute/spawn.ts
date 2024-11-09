import { spawn, SpawnOptions, SpawnOptionsWithoutStdio } from 'child_process';
import { platform } from 'os';

type Data = { chunk: string; type: 'err' | 'out' }[];

export const asyncSpawn = async (
	command: string,
	args: readonly string[],
	options?: SpawnOptionsWithoutStdio | SpawnOptions,
): Promise<{ data: Data }> => {
	return new Promise((res, rej) => {
		const childProcess = spawn(command, args, { ...options });
		const data: Data = [];

		childProcess.stdout?.on('data', (chunk) => data.push({ chunk: chunk.toString(), type: 'out' }));
		childProcess.stderr?.on('data', (chunk) => data.push({ chunk: chunk.toString(), type: 'err' }));

		childProcess.on('close', (code) => {
			if (code !== 0) {
				const err = new Error(
					data
						.filter((item) => item.type === 'err')
						.map((item) => item.chunk)
						.join(''),
				);
				return rej(err);
			}
			res({ data });
		});
		childProcess.on('error', (err) => {
			rej(new Error(`${command} ${args.join(' ')}\n\n` + err.message));
		});
	});
};

export const asyncSpawnShellByPlatform = async (
	args: readonly string[],
	options?: SpawnOptionsWithoutStdio | SpawnOptions,
): Promise<{ data: Data }> => {
	const isWin = platform() === 'win32';
	if (isWin) {
		return await asyncSpawn('cmd', ['/c', ...args], options);
	}
	//
	return await asyncSpawn('sh', ['-c', ...args], options);
};

export const getOnlyOutData = (data: Data) => {
	return data
		.filter((item) => item.type === 'out')
		.map((item) => item.chunk)
		.join('');
};

export const getOnlyErrData = (data: Data) => {
	return data
		.filter((item) => item.type === 'err')
		.map((item) => item.chunk)
		.join('');
};
