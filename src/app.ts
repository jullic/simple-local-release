import { Command } from 'commander';

import { FirstMajorReleaseAction, FirstMajorReleaseCommand } from './commands/first-major-release';
import { GetNextVersionAction, GetNextVersionCommand } from './commands/get-next-version';
import { ReleaseAction, ReleaseCommand } from './commands/release';

export class App {
	async init() {
		const program = new Command();
		new ReleaseCommand(new ReleaseAction()).load(program);
		new FirstMajorReleaseCommand(new FirstMajorReleaseAction()).load(program);
		new GetNextVersionCommand(new GetNextVersionAction()).load(program);

		await program.parseAsync();
	}
}
