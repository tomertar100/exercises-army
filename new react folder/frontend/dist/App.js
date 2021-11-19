"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
//importing components
var form_1 = require("./components/form");
var todoList_1 = require("./components/todoList");
function App() {
    var _a = (0, react_1.useState)(""), inputText = _a[0], setInputText = _a[1];
    var _b = (0, react_1.useState)(""), inputDate = _b[0], setInputDate = _b[1];
    var _c = (0, react_1.useState)([]), todos = _c[0], setTodos = _c[1];
    var _d = (0, react_1.useState)("all"), status = _d[0], setStatus = _d[1];
    var _e = (0, react_1.useState)([]), filteredTodos = _e[0], setFilteredTodos = _e[1];
    var _f = (0, react_1.useState)(new Date()), currentTime = _f[0], setCurrentTime = _f[1];
    var filterHandle = function () {
        switch (status) {
            case "completed":
                setFilteredTodos(todos.filter(function (todo) { return todo.completed === true; }));
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter(function (todo) { return todo.completed === false; }));
                break;
            case "overdue":
                setFilteredTodos(todos.filter(function (todo) { return todo.overdue === true; }));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };
    (0, react_1.useEffect)(function () { return console.log(todos); }, [todos]);
    (0, react_1.useEffect)(function () {
        setInterval(function () { return setCurrentTime(new Date()); }, 1000);
    }, []);
    (0, react_1.useEffect)(function () {
        filterHandle();
    }, [todos, status]);
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("h1", null, "ToDo's"),
        react_1.default.createElement(form_1.default, { todos: todos, setTodos: setTodos, inputText: inputText, setInputText: setInputText, inputDate: inputDate, setInputDate: setInputDate, status: status, setStatus: setStatus }),
        react_1.default.createElement(todoList_1.default, { setCurrentTime: setCurrentTime, currentTime: currentTime, filteredTodos: filteredTodos, setTodos: setTodos, todos: todos })));
}
exports.default = App;
//# sourceMappingURL=App.js.map