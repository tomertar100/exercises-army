"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users/", userRoutes_1.default);
app.listen(port, () => {
    console.log("listening at port " + port);
});
//# sourceMappingURL=server.js.map