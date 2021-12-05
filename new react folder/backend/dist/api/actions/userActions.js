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
exports.createUser = exports.getUser = void 0;
const userActionsSql_1 = require("../../sql/userActionsSql");
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, userActionsSql_1.getUserSql)(username);
    });
}
exports.getUser = getUser;
function createUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, userActionsSql_1.createUserSql)(username, password);
    });
}
exports.createUser = createUser;
//# sourceMappingURL=userActions.js.map