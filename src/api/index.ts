import { ChainInteractor, Environment } from "../chain-interactor";
import { SerializationResolver } from "../serialization";
import { SerializationCore } from "../serialization/core";
import { stringifyWithBigint } from "../utils/parse";
import {
  InvokeContractFailedResult,
  InvokeContractSuccessResult,
} from "@concordium/node-sdk";

import AddressSerialization = SerializationCore.AddressSerializer;
import NumberSerialization = SerializationCore.NumberSerializer;
import StringSerializer = SerializationCore.StringSerializer;
import { config as appConfig } from '../config';

export type SmartContractConfig = {
  resolverContractIndex: number;
  resolverContractSubIndex: number;
};

export interface ICnsApi {
  resolve(domainName: string): Promise<string | undefined>;
  connect(): Promise<void>;
}

abstract class AbstractCnsApi implements ICnsApi {
  protected resolver: SerializationResolver;
  protected resolverContractIndex: number;
  protected resolverContractSubIndex: number;
  protected chainInteractor: ChainInteractor;

  async resolve(domainName: string): Promise<string | undefined> {
    const bytes = this.resolver.resolve(domainName);
    const consensusStatus =
      await this.chainInteractor.client?.getConsensusStatus();
    const result: InvokeContractSuccessResult | InvokeContractFailedResult =
      await this.chainInteractor.invokeContract(
        consensusStatus?.lastFinalizedBlock || "",
        '',
        "BictoryCns.resolve",
        this.resolverContractIndex,
        this.resolverContractSubIndex,
        undefined,
        Buffer.from(bytes)
      );
    if (Boolean(result) && result.tag === "success") {
      // @ts-ignore
      return this.resolver.deserializeAddress(
        Buffer.from(result.returnValue, "hex")
      );
    } else if (Boolean(result) && result.tag === "failure") {
      // @ts-ignore
      console.error(
        `Invoke resolve method is failed: ${stringifyWithBigint(result.reason)}`
      );
    }
    return "";
  }

  async connect(): Promise<void> {
    await this.chainInteractor.connect();
  }
}

export class CnsApi extends AbstractCnsApi {
  constructor(chainInteractor: ChainInteractor, config: SmartContractConfig) {
    super();
    this.resolver = new SerializationResolver(
      new NumberSerialization(),
      new AddressSerialization(),
      new StringSerializer()
    );
    this.resolverContractIndex = config.resolverContractIndex;
    this.resolverContractSubIndex = config.resolverContractSubIndex;
    this.chainInteractor = chainInteractor;
  }
}

export class BictoryCnsApi extends AbstractCnsApi {
  constructor(environment: Environment) {
    super();
    this.resolver = new SerializationResolver(
      new NumberSerialization(),
      new AddressSerialization(),
      new StringSerializer()
    );
    this.resolverContractIndex =
      environment === Environment.TESTNET
        ? Number(appConfig.testnet.resolverIndex)
        : Number(appConfig.mainnet.resolverIndex);
    this.resolverContractSubIndex =
      environment === Environment.TESTNET
        ? Number(appConfig.testnet.resolverSubIndex)
        : Number(appConfig.mainnet.resolverSubIndex);
    this.chainInteractor = ChainInteractor.createWithEnvironment(environment);
  }
}
