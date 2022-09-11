"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationResolver = void 0;
var parse_1 = require("../utils/parse");
var SerializationResolver = /** @class */ (function () {
    function SerializationResolver(numberSerializer, addressSerializer, stringSerializer) {
        this.numberSerializer = numberSerializer;
        this.addressSerializer = addressSerializer;
        this.stringSerializer = stringSerializer;
    }
    SerializationResolver.prototype.register = function (domain, address, duration) {
        var domainBuffer = (0, parse_1.arrayBufferToIterable)(this.stringSerializer.serialize(domain));
        var addressBuffer = (0, parse_1.arrayBufferToIterable)(this.addressSerializer.serialize(address));
        var durationBuffer = (0, parse_1.arrayBufferToIterable)(this.numberSerializer.serialize(duration, { lengthInBytes: 1 }));
        return Buffer.from(__spreadArray(__spreadArray(__spreadArray([], domainBuffer, true), addressBuffer, true), durationBuffer, true));
    };
    SerializationResolver.prototype.extend = function (domain, address) {
        var domainBuffer = (0, parse_1.arrayBufferToIterable)(this.stringSerializer.serialize(domain));
        var addressBuffer = (0, parse_1.arrayBufferToIterable)(this.addressSerializer.serialize(address));
        return Buffer.from(__spreadArray(__spreadArray([], domainBuffer, true), addressBuffer, true));
    };
    SerializationResolver.prototype.setAddress = function (domain, address) {
        var domainBuffer = (0, parse_1.arrayBufferToIterable)(this.stringSerializer.serialize(domain));
        var addressBuffer = (0, parse_1.arrayBufferToIterable)(this.addressSerializer.serialize(address));
        return Buffer.from(__spreadArray(__spreadArray([], domainBuffer, true), addressBuffer, true));
    };
    SerializationResolver.prototype.resolve = function (domain) {
        var domainBuffer = (0, parse_1.arrayBufferToIterable)(this.stringSerializer.serialize(domain));
        var lengthBuffer = (0, parse_1.arrayBufferToIterable)(this.numberSerializer.serialize(domainBuffer.length, { lengthInBytes: 4 }));
        return Buffer.from(__spreadArray(__spreadArray([], lengthBuffer, true), domainBuffer, true));
    };
    SerializationResolver.prototype.deserializeAddress = function (buffer) {
        return this.addressSerializer.deserialize(buffer);
    };
    return SerializationResolver;
}());
exports.SerializationResolver = SerializationResolver;
//# sourceMappingURL=index.js.map