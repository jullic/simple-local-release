"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCommand = void 0;
class AbstractCommand {
    constructor(action, baseCommand) {
        this.action = action;
        this.baseCommand = baseCommand;
    }
}
exports.AbstractCommand = AbstractCommand;
