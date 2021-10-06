"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const arrayRouting_1 = __importDefault(require("./arrayRouting"));
const app = express_1.default();
//regular routing
app.get("/", (req, res) => {
    const date = new Date().toJSON().slice(0, 10);
    const username = res.locals.user;
    res.json({
        msg: `Hello ${username} today is ${date}`,
    });
});
app.get("/echo", (req, res) => {
    const msg = req.query.msg;
    res.json({
        echo: "the message is: " + msg,
    });
});
app.use("/array/", arrayRouting_1.default);
app.all("/", (req, res) => {
    res.status(405).json({
        method: "invalid method used",
    });
});
app.all("*", (req, res) => {
    res.status(404).json({
        route: "invaid route",
    });
});
exports.default = app;
//# sourceMappingURL=regularRouting.js.map