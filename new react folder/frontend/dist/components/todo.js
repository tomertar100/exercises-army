"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TodoItem = function (_a) {
    var text = _a.text, date = _a.date, todos = _a.todos, setTodos = _a.setTodos, todo = _a.todo, currentTime = _a.currentTime;
    var _b = (0, react_1.useState)(""), editText = _b[0], setEditText = _b[1];
    var _c = (0, react_1.useState)(""), editDate = _c[0], setEditDate = _c[1];
    (0, react_1.useEffect)(function () {
        if (currentTime > new Date(todo.date) &&
            currentTime.getDate() !== new Date(todo.date).getDate()) {
            todo.overdue = true;
        }
        else {
            todo.overdue = false;
        }
    }, [currentTime]);
    var handleDelete = function () {
        setTodos(todos.filter(function (item) { return item.id !== todo.id; }));
    };
    var toggleComplete = function () {
        setTodos(todos.map(function (item) {
            if (item.id === todo.id) {
                return __assign(__assign({}, item), { completed: !item.completed });
            }
            return item;
        }));
    };
    var toggleEdit = function () {
        setTodos(todos.map(function (item) {
            if (item.id === todo.id) {
                return __assign(__assign({}, item), { isEditing: true });
            }
            return item;
        }));
    };
    var handleEdit = function () {
        setTodos(todos.map(function (item) {
            if (item.id === todo.id) {
                if (!editText || /^\s*$/.test(editText)) {
                    return item;
                }
                if (editDate === null || editDate === "") {
                    return item;
                }
                todo.text = editText;
                todo.date = editDate;
                return __assign(__assign({}, item), { isEditing: false });
            }
            return item;
        }));
        setEditText("");
        setEditDate("");
    };
    return (react_1.default.createElement("div", { className: "todo" },
        react_1.default.createElement("li", { key: todo.id, className: "todo-item" },
            !todo.isEditing ? (react_1.default.createElement("p", { id: "text" }, text)) : (react_1.default.createElement("input", { type: "text", value: editText, placeholder: "Update A Todo", onChange: function (e) { return setEditText(e.target.value); } })),
            !todo.isEditing ? (react_1.default.createElement("p", { id: "date" },
                "due: ",
                date)) : (react_1.default.createElement("input", { type: "date", onChange: function (e) { return setEditDate(e.target.value); } }))),
        !todo.isEditing ? (react_1.default.createElement("button", { className: "edit-button", onClick: toggleEdit }, "edit")) : (react_1.default.createElement("button", { onClick: handleEdit }, "update")),
        !todo.isEditing ? (react_1.default.createElement("button", { onClick: toggleComplete, className: "complete-button" }, "complete")) : null,
        !todo.isEditing ? (react_1.default.createElement("button", { onClick: handleDelete, className: "delete-button" }, "delete")) : null));
};
exports.default = TodoItem;
//# sourceMappingURL=todo.js.map