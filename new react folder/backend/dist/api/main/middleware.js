"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = "secret";
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.secretKey, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            res.locals.user = data === null || data === void 0 ? void 0 : data.name;
            return next();
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=middleware.js.map