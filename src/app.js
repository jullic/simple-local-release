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
exports.App = void 0;
const commander_1 = require("commander");
const first_major_release_1 = require("./commands/first-major-release");
const get_next_version_1 = require("./commands/get-next-version");
const release_1 = require("./commands/release");
class App {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const program = new commander_1.Command();
            new release_1.ReleaseCommand(new release_1.ReleaseAction()).load(program);
            new first_major_release_1.FirstMajorReleaseCommand(new first_major_release_1.FirstMajorReleaseAction()).load(program);
            new get_next_version_1.GetNextVersionCommand(new get_next_version_1.GetNextVersionAction()).load(program);
            yield program.parseAsync();
        });
    }
}
exports.App = App;
