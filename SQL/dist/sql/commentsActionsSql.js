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
exports.createCommentSql = exports.getCommentSql = exports.getAllCommentsSql = void 0;
const connection_1 = require("./connection");
function getAllCommentsSql() {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            return (yield connected.query("SELECT * FROM comments")).rows;
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            yield connected.release();
        }
    });
}
exports.getAllCommentsSql = getAllCommentsSql;
function getCommentSql(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            return (yield connected.query(`SELECT * FROM comments WHERE id = '${id}'`))
                .rows[0];
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            yield connected.release();
        }
    });
}
exports.getCommentSql = getCommentSql;
function createCommentSql(user_id, post_id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            return yield connected.query(`INSERT INTO comments(user_id,post_id,content) VALUES('${user_id}','${post_id}','${content}')`);
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            yield connected.release();
        }
    });
}
exports.createCommentSql = createCommentSql;
//# sourceMappingURL=commentsActionsSql.js.map