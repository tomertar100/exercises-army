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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsActions_1 = require("../actions/postsActions");
const postRouter = express_1.default.Router();
postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, postsActions_1.getAllPosts)();
    res.json(data);
}));
postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield (0, postsActions_1.getPost)(id);
    res.json(post);
}));
postRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.body.user_id;
    const content = req.body.content;
    yield (0, postsActions_1.createPost)(user_id, content);
    res.json("post Created");
}));
postRouter.put("/upvote/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.id;
    yield (0, postsActions_1.upvotePost)(post_id);
    res.json("upvoted");
}));
postRouter.put("/downvote/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.id;
    yield (0, postsActions_1.downvotePost)(post_id);
    res.json("downvoted");
}));
exports.default = postRouter;
//# sourceMappingURL=postRoutes.js.map