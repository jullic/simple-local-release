import { Command } from 'commander';
import { AbstractCommand } from '../abstract/abstract.command';
export declare class GetNextVersionCommand extends AbstractCommand {
    load(program: Command): Command;
}
