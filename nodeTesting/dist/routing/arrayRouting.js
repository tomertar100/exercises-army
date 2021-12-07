"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_1 = require("../storage");
const logics_1 = require("../logics/logics");
const middleware_1 = require("../logics/middleware");
const arrayRouter = express_1.default.Router();
//array Routing
arrayRouter
    .route("/")
    .get((req, res) => {
    res.json({
        array: storage_1.storageArray,
    });
})
    .post(middleware_1.isAdmin, (req, res) => {
    const value = req.body.value;
    if (logics_1.checkCorrectType(value)) {
        storage_1.storageArray.push(value);
        res.status(201).json({
            array: storage_1.storageArray,
        });
    }
    else {
        res.status(400).json({
            value: "invalid value entered",
        });
    }
})
    .delete(middleware_1.isAdmin, (req, res) => {
    storage_1.storageArray.pop();
    res.json({
        array: storage_1.storageArray,
    });
});
arrayRouter.all("/", (req, res) => {
    res.status(405).json({
        method: "invalid method used",
    });
});
arrayRouter
    .route("/:index")
    .get((req, res) => {
    if (req.params.index) {
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
    }
})
    .put(middleware_1.isAdmin, (req, res) => {
    const value = req.body.value;
    if (typeof req.params.index === "number") {
        const arrayIndex = logics_1.isIndexInArray(Number(req.params.index), storage_1.storageArray);
        if (arrayIndex !== -1 && logics_1.checkCorrectType(value)) {
            storage_1.storageArray[arrayIndex] = value;
            res.json({
                array: storage_1.storageArray,
            });
        }
        else {
            if (typeof arrayIndex === "number") {
                res.status(400).json({
                    index: "invalid index",
                });
            }
        }
    }
})
    .delete(middleware_1.isAdmin, (req, res) => {
    if (req.params.index) {
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
    }
});
arrayRouter.all("/:index", (req, res) => {
    res.status(405).json({
        method: "invalid method used",
    });
});
arrayRouter.all("/", (req, res) => {
    res.status(404).json({
        route: "invalid route",
    });
});
exports.default = arrayRouter;
//# sourceMappingURL=arrayRouting.js.map