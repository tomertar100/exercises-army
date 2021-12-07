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
exports.deleteTodo = exports.updateComplete = exports.updateTodo = exports.addTodo = exports.getAllTodos = void 0;
const todosActionsSql_1 = require("../../sql/todosActionsSql");
function getAllTodos(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, todosActionsSql_1.getAllTodosSql)(user_id);
    });
}
exports.getAllTodos = getAllTodos;
function addTodo(user_id, text, date, completed, overdue, isEditing) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, todosActionsSql_1.addTodoSql)(user_id, text, date, completed, overdue, isEditing);
    });
}
exports.addTodo = addTodo;
function updateTodo(id, text, date) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, todosActionsSql_1.updateTodoSql)(id, text, date);
    });
}
exports.updateTodo = updateTodo;
function updateComplete(id, complete) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, todosActionsSql_1.updateCompleteSql)(id, complete);
    });
}
exports.updateComplete = updateComplete;
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, todosActionsSql_1.deleteTodoSql)(id);
    });
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todosActions.js.map