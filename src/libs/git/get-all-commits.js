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
exports.getAllCommits = void 0;
const simple_local_release_error_1 = require("../../common/errors/simple-local-release-error");
const spawn_1 = require("../execute/spawn");
const get_commit_from_string_1 = require("./get-commit-from-string");
const getAllCommits = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield (0, spawn_1.asyncSpawnShellByPlatform)(['git log']);
        const fullOutData = (0, spawn_1.getOnlyOutData)(data);
        return (0, get_commit_from_string_1.getCommitsFromString)(fullOutData);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new simple_local_release_error_1.SimpleLocalReleaseError(error.message);
        }
        throw new Error('Error');
    }
});
exports.getAllCommits = getAllCommits;
