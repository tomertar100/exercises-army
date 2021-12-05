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
exports.createUserSql = exports.getUserSql = void 0;
const connections_1 = require("./connections");
function getUserSql(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        console.log(username);
        try {
            const result = yield connected.query(`SELECT * FROM users WHERE username ='${username}'`);
            console.log(result);
            return result.rows[0];
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            connected.release();
        }
    });
}
exports.getUserSql = getUserSql;
function createUserSql(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            return yield connected.query(`INSERT INTO users(username,password) VALUES('${username}','${password}')`);
        }
        catch (error) {
            console.log("error querying: " + error);
        }
        finally {
            yield connected.release();
        }
    });
}
exports.createUserSql = createUserSql;
//# sourceMappingURL=userActionsSql.js.map