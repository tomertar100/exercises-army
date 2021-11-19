"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Form = function (_a) {
    var inputText = _a.inputText, setInputText = _a.setInputText, inputDate = _a.inputDate, setInputDate = _a.setInputDate, todos = _a.todos, setTodos = _a.setTodos, status = _a.status, setStatus = _a.setStatus;
    var handleSubmitTodo = function (e) {
        e.preventDefault();
        if (!inputText || /^\s*$/.test(inputText)) {
            return;
        }
        if (inputDate === null || inputDate === "") {
            return;
        }
        setTodos(__spreadArray(__spreadArray([], todos, true), [
            {
                text: inputText,
                date: inputDate,
                completed: false,
                overdue: false,
                isEditing: false,
                id: Math.random() * 10000,
            },
        ], false));
        setInputText("");
        setInputDate("");
    };
    return (react_1.default.createElement("form", null,
        react_1.default.createElement("input", { placeholder: "Enter A Todo", type: "text", className: "todo-input", onChange: function (e) { return setInputText(e.target.value); }, value: inputText }),
        react_1.default.createElement("input", { type: "date", className: "todo-date-input", onChange: function (e) { return setInputDate(e.target.value); }, value: inputDate }),
        react_1.default.createElement("button", { onClick: function () { return handleSubmitTodo; }, type: "submit", className: "todo-button" },
            react_1.default.createElement("i", null, "Add")),
        react_1.default.createElement("select", { onChange: function (e) { return setStatus(e.target.value); } },
            react_1.default.createElement("option", { value: "all" }, "All"),
            react_1.default.createElement("option", { value: "completed" }, "Completed"),
            react_1.default.createElement("option", { value: "uncompleted" }, "Uncompleted"),
            react_1.default.createElement("option", { value: "overdue" }, "Overdue"))));
};
exports.default = Form;
//# sourceMappingURL=form.js.map