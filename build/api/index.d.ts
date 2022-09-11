import { ChainInteractor, Environment } from "../chain-interactor";
import { SerializationResolver } from "../serialization";
export declare type SmartContractConfig = {
    resolverContractIndex: number;
    resolverContractSubIndex: number;
};
export interface ICnsApi {
    resolve(domainName: string): Promise<string | undefined>;
    connect(): Promise<void>;
}
declare abstract class AbstractCnsApi implements ICnsApi {
    protected resolver: SerializationResolver;
    protected resolverContractIndex: number;
    protected resolverContractSubIndex: number;
    protected chainInteractor: ChainInteractor;
    resolve(domainName: string): Promise<string | undefined>;
    connect(): Promise<void>;
}
export declare class CnsApi extends AbstractCnsApi {
    constructor(chainInteractor: ChainInteractor, config: SmartContractConfig);
}
export declare class BictoryCnsApi extends AbstractCnsApi {
    constructor(environment: Environment);
}
export {};
