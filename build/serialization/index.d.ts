import { SerializationCore } from "./core";
export declare class SerializationResolver {
    private readonly numberSerializer;
    private readonly addressSerializer;
    private readonly stringSerializer;
    constructor(numberSerializer: SerializationCore.NumberSerializer, addressSerializer: SerializationCore.AddressSerializer, stringSerializer: SerializationCore.StringSerializer);
    register(domain: string, address: string, duration: number): ArrayBuffer;
    extend(domain: string, address: string): ArrayBuffer;
    setAddress(domain: string, address: string): ArrayBuffer;
    resolve(domain: string): ArrayBuffer;
    deserializeAddress(buffer: ArrayBuffer): string;
}
