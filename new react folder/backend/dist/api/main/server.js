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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todosRoutes_1 = __importDefault(require("../routes/todosRoutes"));
const middleware_1 = require("./middleware");
const userActions_1 = require("../actions/userActions");
const errorhandler_1 = require("./errorhandler");
const cors_1 = __importDefault(require("cors"));
const port = 3002;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // const username = req.body.username;
    // const password = req.body.password;
    const loginUser = yield (0, userActions_1.getUser)({ username });
    if (loginUser) {
        if (loginUser.password === password) {
            const accessToken = jsonwebtoken_1.default.sign(username, middleware_1.secretKey);
            res.json({ accessToken: accessToken, user_id: loginUser.user_id });
        }
        else {
            res.status(400).json("password not matching");
        }
    }
    else {
        res.status(404).json("user not found");
    }
}));
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const isUser = yield (0, userActions_1.getUser)(username);
    if (isUser === undefined) {
        res.status(409).json("user already exists");
    }
    else {
        yield (0, userActions_1.createUser)({ username, password });
        res.status(201).json("user created, username: " + username);
    }
}));
app.use("/", middleware_1.authenticateToken);
app.use("/todos", todosRoutes_1.default);
app.all("*", (req, res) => res.status(404).json({ err: "invalid route" }));
app.use(errorhandler_1.errorHandler);
app.listen(port, () => {
    console.log("listening at port: " + port);
});
//# sourceMappingURL=server.js.map