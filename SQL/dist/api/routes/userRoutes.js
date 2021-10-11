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
const userAction_1 = require("../actions/userAction");
const userRouter = express_1.default.Router();
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, userAction_1.getAllUsers)();
    res.json(data);
}));
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log("error");
    yield (0, userAction_1.createUser)(username, password);
    console.log("error2");
    const data = yield (0, userAction_1.getAllUsers)();
    res.json(data);
}));
userRouter.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const user = yield (0, userAction_1.getUser)(username);
    res.json(user);
}));
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map