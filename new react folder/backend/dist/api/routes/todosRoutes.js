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
const todosActions_1 = require("../actions/todosActions");
const todosRouter = express_1.default.Router();
todosRouter.get("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    const data = yield (0, todosActions_1.getAllTodos)(user_id);
    res.json(data);
}));
todosRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.body.user_id;
    const text = req.body.text;
    const date = req.body.date;
    const completed = req.body.completed;
    const overdue = req.body.overdue;
    const isEditing = req.body.isEditing;
    yield (0, todosActions_1.addTodo)(user_id, text, date, completed, overdue, isEditing);
    res.json("added new todo");
}));
todosRouter.patch("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const text = req.body.text;
    const date = req.body.date;
    yield (0, todosActions_1.updateTodo)(id, text, date);
    res.json("todo updated");
}));
todosRouter.patch("/:id/complete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const completed = req.body.completed;
    yield (0, todosActions_1.updateComplete)(id, completed);
    res.json("todo complete field updated");
}));
todosRouter.patch("/:id/editing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isEditing = req.body.isEditing;
    yield (0, todosActions_1.updateEditingTodo)(id, isEditing);
    res.json("todo isEditing field updated");
}));
todosRouter.delete("/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, todosActions_1.deleteTodo)(id);
    res.json("todo deleted");
}));
exports.default = todosRouter;
//# sourceMappingURL=todosRoutes.js.map