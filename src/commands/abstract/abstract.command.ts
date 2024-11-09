import { Command } from 'commander';

import { AbstractAction } from './abstract.action';

export interface IAbstractCommand {
	load(program: Command): void | Command | Promise<void>;
}

export abstract class AbstractCommand implements IAbstractCommand {
	constructor(
		protected action: AbstractAction,
		protected baseCommand?: Command,
	) {}

	public abstract load(program: Command): void | Command | Promise<void>;
}
