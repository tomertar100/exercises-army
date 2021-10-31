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
exports.downvoteComment = exports.upvoteComment = exports.createComment = exports.getComment = exports.getAllComments = void 0;
const commentsActionsSql_1 = require("../../sql/commentsActionsSql");
function getAllComments() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, commentsActionsSql_1.getAllCommentsSql)();
    });
}
exports.getAllComments = getAllComments;
function getComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, commentsActionsSql_1.getCommentSql)(id);
    });
}
exports.getComment = getComment;
function createComment(user_id, post_id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, commentsActionsSql_1.createCommentSql)(user_id, post_id, content);
    });
}
exports.createComment = createComment;
function upvoteComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, commentsActionsSql_1.upvoteCommentSql)(id);
    });
}
exports.upvoteComment = upvoteComment;
function downvoteComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, commentsActionsSql_1.downvoteCommentSql)(id);
    });
}
exports.downvoteComment = downvoteComment;
//# sourceMappingURL=commentsActions.js.map