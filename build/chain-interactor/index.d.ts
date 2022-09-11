/// <reference types="node" />
import { ConcordiumNodeClient, InvokeContractResult } from "@concordium/node-sdk";
import { Buffer } from "buffer";
export declare enum Environment {
    TESTNET = "TESTNET",
    MAINNET = "MAINNET"
}
export declare class ChainInteractor {
    private readonly ip?;
    private readonly port?;
    private readonly environment?;
    private _client;
    static create(ip: string, port: number): ChainInteractor;
    static createWithEnvironment(environment: Environment): ChainInteractor;
    private constructor();
    get client(): ConcordiumNodeClient;
    connect(): Promise<ConcordiumNodeClient>;
    invokeContract(blockHash: string, invoker: string, method: string, contractIndex: number, contractSubIndex: number, amount?: number, parameter?: Buffer): Promise<InvokeContractResult>;
}
