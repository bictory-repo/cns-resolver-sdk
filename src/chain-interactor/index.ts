import {
  ConcordiumNodeClient,
  InvokeContractResult,
} from "@concordium/node-sdk";
import { Metadata, credentials } from "@grpc/grpc-js";
import { Buffer } from "buffer";
import {config} from '../config';

const timeout = 15000;
const metadataKey = "authentication";
const metadataValue = "rpcadmin";

export enum Environment {
  TESTNET = "TESTNET",
  MAINNET = "MAINNET",
}

export class ChainInteractor {
  private _client: ConcordiumNodeClient;

  public static create(ip: string, port: number): ChainInteractor {
    return new ChainInteractor(ip, port);
  }

  public static createWithEnvironment(
    environment: Environment
  ): ChainInteractor {
    return new ChainInteractor(undefined, undefined, environment);
  }

  private constructor(
    private readonly ip?: string,
    private readonly port?: number,
    private readonly environment?: Environment
  ) {
    if (!ip && !port && !environment) {
      throw new Error("ip, port or at least environment should be set");
    }
    if (!ip && !port && environment) {
      if (environment === Environment.MAINNET) {
        this.ip = config.mainnet.nodeIp;
        this.port = config.mainnet.nodePort;
      } else {
        this.ip = config.testnet.nodeIp;
        this.port = config.testnet.nodePort;
      }
    } else if (!ip || !port) {
      throw new Error(
        "ip or port is not set, please check your configuration again!"
      );
    }
  }

  get client() {
    return this._client;
  }

  async connect(): Promise<ConcordiumNodeClient> {
    const metadata = new Metadata();
    metadata.add(metadataKey, metadataValue);

    const insecureCredentials = credentials.createInsecure();
    this._client = new ConcordiumNodeClient(
      this.ip,
      this.port,
      insecureCredentials,
      metadata,
      timeout
    );
    return this.client;
  }

  async invokeContract(
    blockHash: string,
    invoker: string,
    method: string,
    contractIndex: number,
    contractSubIndex: number,
    amount?: number,
    parameter?: Buffer
  ): Promise<InvokeContractResult> {
    if (!this._client) {
      throw new Error("Please call connect method before the invoke");
    }
    // @ts-ignore
    return await this._client.invokeContract(
      {
        // @ts-ignore
        parameter,
        method,
        invoker: undefined,
        // @ts-ignore
        contract: { index: contractIndex, subindex: contractSubIndex },
        // @ts-ignore
        amount: amount ? new GtuAmount(amount) : undefined,
        // @ts-ignore
        energy: 30000,
      },
      blockHash
    );
  }
}
