"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyWithBigint = exports.arrayBufferToIterable = void 0;
var arrayBufferToIterable = function (array) {
    return Array.from(new Uint8Array(array));
};
exports.arrayBufferToIterable = arrayBufferToIterable;
var stringifyWithBigint = function (object) {
    return JSON.stringify(object, function (_, v) { return (typeof v === "bigint" ? v.toString() : v); }, 2);
};
exports.stringifyWithBigint = stringifyWithBigint;
//# sourceMappingURL=parse.js.map