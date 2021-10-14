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
const commentsActions_1 = require("../actions/commentsActions");
const commentsRouter = express_1.default.Router();
commentsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, commentsActions_1.getAllComments)();
    res.json(data);
}));
commentsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const comment = yield (0, commentsActions_1.getComment)(id);
    res.json(comment);
}));
commentsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    const post_id = req.params.post_id;
    const content = req.params.content;
    yield (0, commentsActions_1.createComment)(user_id, post_id, content);
    res.json("comment Created");
}));
exports.default = commentsRouter;
//# sourceMappingURL=commentRoutes.js.map