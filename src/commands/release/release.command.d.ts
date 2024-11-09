import { Command } from 'commander';
import { AbstractCommand } from '../abstract/abstract.command';
export declare class ReleaseCommand extends AbstractCommand {
    load(program: Command): Command;
}
