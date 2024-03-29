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
todosRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, text, date, completed, overdue, isEditing } = req.body;
    yield (0, todosActions_1.addTodo)({ user_id, text, date, completed, overdue, isEditing });
    if (!user_id || user_id == undefined) {
        res
            .status(400)
            .json({ err: "missing user_id field or invalid user_id field" });
    }
    if (!text || text == undefined) {
        res.status(400).json({ err: "missing text field or invalid text field" });
    }
    if (!date || date == undefined) {
        res.status(400).json({ err: "missing date field or invalid date field" });
    }
    if (completed == undefined) {
        res
            .status(400)
            .json({ err: "missing completed field or invalid completed field" });
    }
    if (overdue == undefined) {
        res
            .status(400)
            .json({ err: "missing overdue field or invalid overdue field" });
    }
    if (isEditing == undefined) {
        res
            .status(400)
            .json({ err: "missing isEditing field or invalid isEditing field" });
    }
    res.status(201).json({ msg: "added new todo" });
}));
todosRouter.all("/", (req, res, next) => {
    res.status(405).json({ err: "method not allowed" });
});
todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.id;
    const obj = { user_id };
    const data = yield (0, todosActions_1.getAllTodos)(obj);
    if (!user_id) {
        res.status(400).json({ err: "missing user_id" });
    }
    if (typeof user_id !== "string") {
        res.status(400).json({ err: "invalid user_id eneterd" });
    }
    if (data === undefined || !data) {
        res.status(400).json({ err: "not found" });
    }
    res.status(200).json(data);
}));
todosRouter.patch("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { text, date } = req.body;
    const obj = { id, text, date };
    yield (0, todosActions_1.updateTodo)(obj);
    if (!id) {
        res.status(400).json({ err: "missing field" });
    }
    if (!text || !date) {
        res.status(400).json({ err: "missing text or date" });
    }
    res.status(200).json({ msg: "todo updated" });
}));
todosRouter.patch("/:id/complete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const completed = req.body.completed;
    const obj = { id, completed };
    yield (0, todosActions_1.updateComplete)(obj);
    if (!id) {
        res.status(400).json({ err: "missing task_id" });
    }
    if (completed == undefined) {
        res.status(400).json({ err: "missing completed field" });
    }
    res.status(204).json({ msg: "updatesd completed field" });
}));
todosRouter.patch("/:id/editing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isEditing = req.body.isEditing;
    const obj = { id, isEditing };
    yield (0, todosActions_1.updateEditingTodo)(obj);
    if (!id) {
        res.status(400).json({ err: "missing task_id" });
    }
    if (isEditing == undefined) {
        res.status(400).json({ err: "missing editing field" });
    }
    res.status(200).json({ msg: "updated isEditing field" });
}));
todosRouter.delete("/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const obj = { id };
    yield (0, todosActions_1.deleteTodo)(obj);
    if (!id) {
        res.status(400).json({ err: "missing task_id" });
    }
    res.status(200).json({ msg: "todo deleted" });
}));
todosRouter.all("/:id", (req, res, next) => {
    res.status(405).json({ err: "mothod not allowed" });
});
exports.default = todosRouter;
//# sourceMappingURL=todosRoutes.js.map