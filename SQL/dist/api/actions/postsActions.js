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
exports.downvotePost = exports.upvotePost = exports.createPost = exports.getPost = exports.getAllPosts = void 0;
const postsActionsSql_1 = require("../../sql/postsActionsSql");
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, postsActionsSql_1.getAllPostsSql)();
    });
}
exports.getAllPosts = getAllPosts;
function getPost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, postsActionsSql_1.getPostSql)(id);
    });
}
exports.getPost = getPost;
function createPost(user_id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, postsActionsSql_1.createPostSql)(user_id, content);
    });
}
exports.createPost = createPost;
function upvotePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, postsActionsSql_1.upvotePostSql)(id);
    });
}
exports.upvotePost = upvotePost;
function downvotePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, postsActionsSql_1.downvotePostSql)(id);
    });
}
exports.downvotePost = downvotePost;
//# sourceMappingURL=postsActions.js.map