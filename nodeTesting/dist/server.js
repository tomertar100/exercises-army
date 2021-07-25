"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_1 = require("./storage");
const logics_1 = require("./logics");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./auth");
const app = express_1.default();
//parses body of the request
app.use(express_1.default.json());
app.post("/login", (req, res) => {
    const userName = req.body.userName;
    const user = { name: userName };
    const accessToken = jsonwebtoken_1.default.sign(user, auth_1.secret);
    res.json({
        userName: userName,
        accessToken: accessToken,
    });
});
app.use("/", auth_1.authenticateToken);
const arrayRouter = express_1.default.Router();
app.use("/array", arrayRouter);
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
//array routing
arrayRouter.get("/", (req, res) => {
    res.json({
        array: storage_1.storageArray,
    });
});
arrayRouter.get("/:index", (req, res) => {
    const arrayIndex = logics_1.isIndexInArray(Number(req.params.index), storage_1.storageArray);
    if (arrayIndex !== -1) {
        const itemInIndex = storage_1.storageArray[arrayIndex];
        res.json({
            itemInIndex: itemInIndex,
        });
    }
    else {
        res.status(400).json({
            index: "invalid index",
        });
    }
});
arrayRouter.post("/", auth_1.isAdmin, (req, res) => {
    const value = req.body.value;
    if (logics_1.checkCorrectType(value)) {
        storage_1.storageArray.push(value);
        res.json({
            array: storage_1.storageArray,
        });
    }
    else {
        res.status(400).json({
            value: "invalid value entered",
        });
    }
});
arrayRouter.put("/:index", auth_1.isAdmin, (req, res) => {
    const value = req.body.value;
    const arrayIndex = logics_1.isIndexInArray(Number(req.params.index), storage_1.storageArray);
    if (arrayIndex !== -1 && logics_1.checkCorrectType(value)) {
        storage_1.storageArray[arrayIndex] = value;
        res.json({
            array: storage_1.storageArray,
        });
    }
    else {
        res.status(404).json({
            index: "invalid index",
        });
    }
});
arrayRouter.delete("/", auth_1.isAdmin, (req, res) => {
    storage_1.storageArray.pop();
    res.json({
        array: storage_1.storageArray,
    });
});
arrayRouter.delete("/:index", auth_1.isAdmin, (req, res) => {
    const arrayIndex = logics_1.isIndexInArray(Number(req.params.index), storage_1.storageArray);
    if (arrayIndex !== -1) {
        storage_1.storageArray.splice(arrayIndex, 1);
        res.json({
            array: storage_1.storageArray,
        });
    }
    else {
        res.status(400).json({
            index: "invalid index",
        });
    }
});
app.listen(3000, () => {
    console.log("listening at port 3000");
});
//# sourceMappingURL=server.js.map