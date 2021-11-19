"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
//importing more components
var todo_1 = require("./todo");
var TodoList = function (_a) {
    var todos = _a.todos, setTodos = _a.setTodos, filteredTodos = _a.filteredTodos, setCurrentTime = _a.setCurrentTime, currentTime = _a.currentTime;
    return (react_1.default.createElement("div", { className: "todo-container" },
        react_1.default.createElement("ul", { className: "todo" }, filteredTodos.map(function (todo) { return (react_1.default.createElement(todo_1.default, { currentTime: currentTime, text: todo.text, date: todo.date, todos: todos, setTodos: setTodos, todo: todo })); }))));
};
exports.default = TodoList;
//# sourceMappingURL=todoList.js.map