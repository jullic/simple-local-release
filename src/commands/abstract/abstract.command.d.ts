import { Command } from 'commander';
import { AbstractAction } from './abstract.action';
export interface IAbstractCommand {
    load(program: Command): void | Command | Promise<void>;
}
export declare abstract class AbstractCommand implements IAbstractCommand {
    protected action: AbstractAction;
    protected baseCommand?: Command | undefined;
    constructor(action: AbstractAction, baseCommand?: Command | undefined);
    abstract load(program: Command): void | Command | Promise<void>;
}
