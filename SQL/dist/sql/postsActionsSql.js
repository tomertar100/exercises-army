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
exports.downvotePostSql = exports.upvotePostSql = exports.createPostSql = exports.getPostSql = exports.getAllPostsSql = void 0;
const connection_1 = require("./connection");
function getAllPostsSql() {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            return (yield connected.query("SELECT * FROM posts")).rows;
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
exports.getAllPostsSql = getAllPostsSql;
function getPostSql(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            return (yield connected.query(`SELECT * FROM posts WHERE id = '${id}'`))
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
exports.getPostSql = getPostSql;
function createPostSql(user_id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            return yield connected.query(`INSERT INTO posts(user_id,content) VALUES('${user_id}','${content}')`);
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
exports.createPostSql = createPostSql;
function upvotePostSql(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            const resultRating = (yield getPostSql(id)).rating + 1;
            return yield connected.query(`UPDATE posts SET rating = ${resultRating} WHERE id = ${id}`);
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
exports.upvotePostSql = upvotePostSql;
function downvotePostSql(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connection_1.pool.connect();
        try {
            const resultRating = (yield getPostSql(id)).rating - 1;
            return yield connected.query(`UPDATE posts SET rating = ${resultRating} WHERE id = ${id}`);
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
exports.downvotePostSql = downvotePostSql;
//# sourceMappingURL=postsActionsSql.js.map