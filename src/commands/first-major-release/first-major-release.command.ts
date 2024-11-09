import { Command } from 'commander';

import { AbstractCommand } from '../abstract/abstract.command';

export class FirstMajorReleaseCommand extends AbstractCommand {
	public load(program: Command): Command {
		return program
			.command('first-major-release')
			.alias('fmr')
			.description('first major release')
			.action(async (...args) => {
				return this.action.handle(program.opts(), ...args);
			});
	}
}
