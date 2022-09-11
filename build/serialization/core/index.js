"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationCore = void 0;
var bs58check_1 = __importDefault(require("bs58check"));
var SerializationCore;
(function (SerializationCore) {
    var NumberSerializer = /** @class */ (function () {
        function NumberSerializer() {
        }
        NumberSerializer.prototype.serialize = function (info, options) {
            var _a;
            var hexDecimal = info.toString(16);
            if (hexDecimal.length % 2 === 1) {
                hexDecimal = "0".concat(hexDecimal);
            }
            var split = ((_a = hexDecimal.match(/.{2}/g)) === null || _a === void 0 ? void 0 : _a.reverse()) || [];
            var array = split.map(function (hex) { return parseInt(hex, 16); });
            var length = options.lengthInBytes || 4;
            var buffer = new ArrayBuffer(length);
            var dataView = new DataView(buffer);
            for (var i = 0; i < array.length; i++) {
                dataView.setUint8(i, array[i]);
            }
            return buffer;
        };
        return NumberSerializer;
    }());
    SerializationCore.NumberSerializer = NumberSerializer;
    var AddressSerializer = /** @class */ (function () {
        function AddressSerializer() {
        }
        AddressSerializer.prototype.serialize = function (info, options) {
            var result = new ArrayBuffer(33);
            var addressBytes = bs58check_1.default.decode(info); // 32
            var dataView = new DataView(result);
            dataView.setUint8(0, 0);
            for (var i = 1; i < addressBytes.length; i++) {
                dataView.setUint8(i, addressBytes[i]);
            }
            return result;
        };
        AddressSerializer.prototype.deserialize = function (buffer) {
            var data = new Uint8Array(buffer);
            var result = new ArrayBuffer(data.length);
            var dataView = new DataView(result);
            dataView.setUint8(0, 1);
            for (var i = 1; i < data.length; i++) {
                dataView.setUint8(i, data[i]);
            }
            return bs58check_1.default.encode(Buffer.from(result));
        };
        return AddressSerializer;
    }());
    SerializationCore.AddressSerializer = AddressSerializer;
    var AccountAddressSerialization = /** @class */ (function () {
        function AccountAddressSerialization() {
        }
        AccountAddressSerialization.prototype.serialize = function (info, options) {
            var result = new ArrayBuffer(32);
            var addressBytes = bs58check_1.default.decode(info);
            var dataView = new DataView(result);
            for (var i = 1; i < addressBytes.length; i++) {
                dataView.setUint8(i - 1, addressBytes[i]);
            }
            return result;
        };
        return AccountAddressSerialization;
    }());
    SerializationCore.AccountAddressSerialization = AccountAddressSerialization;
    var StringSerializer = /** @class */ (function () {
        function StringSerializer() {
        }
        StringSerializer.prototype.serialize = function (info, options) {
            return new Uint8Array(Buffer.from(info)).buffer;
        };
        return StringSerializer;
    }());
    SerializationCore.StringSerializer = StringSerializer;
})(SerializationCore = exports.SerializationCore || (exports.SerializationCore = {}));
//# sourceMappingURL=index.js.map