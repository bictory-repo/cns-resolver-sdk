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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainInteractor = exports.Environment = void 0;
var node_sdk_1 = require("@concordium/node-sdk");
var grpc_js_1 = require("@grpc/grpc-js");
var config_1 = require("../config");
var timeout = 15000;
var metadataKey = "authentication";
var metadataValue = "rpcadmin";
var Environment;
(function (Environment) {
    Environment["TESTNET"] = "TESTNET";
    Environment["MAINNET"] = "MAINNET";
})(Environment = exports.Environment || (exports.Environment = {}));
var ChainInteractor = /** @class */ (function () {
    function ChainInteractor(ip, port, environment) {
        this.ip = ip;
        this.port = port;
        this.environment = environment;
        if (!ip && !port && !environment) {
            throw new Error("ip, port or at least environment should be set");
        }
        if (!ip && !port && environment) {
            if (environment === Environment.MAINNET) {
                this.ip = config_1.config.mainnet.nodeIp;
                this.port = config_1.config.mainnet.nodePort;
            }
            else {
                this.ip = config_1.config.testnet.nodeIp;
                this.port = config_1.config.testnet.nodePort;
            }
        }
        else if (!ip || !port) {
            throw new Error("ip or port is not set, please check your configuration again!");
        }
    }
    ChainInteractor.create = function (ip, port) {
        return new ChainInteractor(ip, port);
    };
    ChainInteractor.createWithEnvironment = function (environment) {
        return new ChainInteractor(undefined, undefined, environment);
    };
    Object.defineProperty(ChainInteractor.prototype, "client", {
        get: function () {
            return this._client;
        },
        enumerable: false,
        configurable: true
    });
    ChainInteractor.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, insecureCredentials;
            return __generator(this, function (_a) {
                metadata = new grpc_js_1.Metadata();
                metadata.add(metadataKey, metadataValue);
                insecureCredentials = grpc_js_1.credentials.createInsecure();
                this._client = new node_sdk_1.ConcordiumNodeClient(this.ip, this.port, insecureCredentials, metadata, timeout);
                return [2 /*return*/, this.client];
            });
        });
    };
    ChainInteractor.prototype.invokeContract = function (blockHash, invoker, method, contractIndex, contractSubIndex, amount, parameter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._client) {
                            throw new Error("Please call connect method before the invoke");
                        }
                        return [4 /*yield*/, this._client.invokeContract({
                                // @ts-ignore
                                parameter: parameter,
                                method: method,
                                invoker: undefined,
                                // @ts-ignore
                                contract: { index: contractIndex, subindex: contractSubIndex },
                                // @ts-ignore
                                amount: amount ? new GtuAmount(amount) : undefined,
                                // @ts-ignore
                                energy: 30000,
                            }, blockHash)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ChainInteractor;
}());
exports.ChainInteractor = ChainInteractor;
//# sourceMappingURL=index.js.map