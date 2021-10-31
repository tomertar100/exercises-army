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
const postRoutes_1 = __importDefault(require("../routes/postRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const commentRoutes_1 = __importDefault(require("../routes/commentRoutes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAction_1 = require("../actions/userAction");
const middleware_1 = require("./middleware");
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const loginUser = yield (0, userAction_1.getUser)(username);
    if (loginUser) {
        const accessToken = jsonwebtoken_1.default.sign(username, middleware_1.secretKey);
        res.json({
            username: username,
            accessToken: accessToken,
        });
    }
    else {
        res.status(401).json("user not found");
    }
}));
app.use("/", middleware_1.authenticateToken);
app.use("/api/posts", postRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/comments", commentRoutes_1.default);
app.listen(port, () => {
    console.log("listening at port " + port);
});
//# sourceMappingURL=server.js.map