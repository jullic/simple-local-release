import { Command } from 'commander';

import { AbstractCommand } from '../abstract/abstract.command';

export class ReleaseCommand extends AbstractCommand {
	public load(program: Command): Command {
		return program
			.command('release')
			.description('release next version and generate auto changelog')
			.action(async (...args) => {
				return this.action.handle(program.opts(), ...args);
			});
	}
}
