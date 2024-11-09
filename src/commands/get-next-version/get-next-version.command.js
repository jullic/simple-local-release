"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNextVersionCommand = void 0;
const abstract_command_1 = require("../abstract/abstract.command");
class GetNextVersionCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        return program
            .command('get-next-version')
            .alias('gnv')
            .description('return next version')
            .action((...args) => __awaiter(this, void 0, void 0, function* () {
            return this.action.handle(program.opts(), ...args);
        }));
    }
}
exports.GetNextVersionCommand = GetNextVersionCommand;
