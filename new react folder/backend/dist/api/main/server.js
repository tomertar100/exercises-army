"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosRoutes_1 = __importDefault(require("../routes/todosRoutes"));
const port = 3002;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todoapp", todosRoutes_1.default);
app.listen(port, () => {
    console.log("listening at port: " + port);
});
//# sourceMappingURL=server.js.map