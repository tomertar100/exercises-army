"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCorrectType = exports.isIndexInArray = void 0;
//helper function that finds the requested index for the array requests
function isIndexInArray(index, array) {
    if (typeof array[index] === "undefined") {
        return -1;
    }
    else {
        return index;
    }
}
exports.isIndexInArray = isIndexInArray;
//helper function
function checkCorrectType(value) {
    if (typeof value === "number" || typeof value === "string") {
        return true;
    }
    else {
        return false;
    }
}
exports.checkCorrectType = checkCorrectType;
module.exports = { isIndexInArray, checkCorrectType };
//# sourceMappingURL=logics.js.map