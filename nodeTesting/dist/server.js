"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./logics/middleware");
const regularRouting_1 = __importDefault(require("./routing/regularRouting"));
// import errorHandler from "./erroHandler";
const app = express_1.default();
//parses body of the request
app.use(express_1.default.json());
app.post("/login", (req, res) => {
    const userName = req.body.userName;
    const user = { name: userName };
    const accessToken = jsonwebtoken_1.default.sign(user, middleware_1.secret);
    res.json({
        userName: userName,
        accessToken: accessToken,
    });
});
app.use("/", middleware_1.authenticateToken);
app.use("/", regularRouting_1.default);
app.all("/login", (req, res) => {
    res.status(405);
});
// app.use(errorHandler);
app.listen(3000, () => {
    console.log("listening at port 3000");
});
//# sourceMappingURL=server.js.map