"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.isAdmin = exports.secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//secret key for jwt
exports.secret = "secretKey";
//authorization function
function isAdmin(req, res, next) {
    const name = res.locals.user;
    if (name.startsWith("admin")) {
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.isAdmin = isAdmin;
//authenticatin function
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined") {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.secret, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            res.locals.user = data.name;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map