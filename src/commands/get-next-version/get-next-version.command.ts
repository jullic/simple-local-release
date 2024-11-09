import { Command } from 'commander';

import { AbstractCommand } from '../abstract/abstract.command';

export class GetNextVersionCommand extends AbstractCommand {
	public load(program: Command): Command {
		return program
			.command('get-next-version')
			.alias('gnv')
			.description('return next version')
			.action(async (...args) => {
				return this.action.handle(program.opts(), ...args);
			});
	}
}
