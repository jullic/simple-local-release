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
exports.FirstMajorReleaseAction = void 0;
const abstract_action_1 = require("../abstract/abstract.action");
const release_action_1 = require("../release/release.action");
class FirstMajorReleaseAction extends abstract_action_1.AbstractAction {
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, release_action_1.releaseActionHandler)(params, true);
        });
    }
}
exports.FirstMajorReleaseAction = FirstMajorReleaseAction;
