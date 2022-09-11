export declare namespace SerializationCore {
    type Options = {
        lengthInBytes?: number;
    };
    interface Serializable<T> {
        serialize(info: T, options?: Options): ArrayBuffer;
    }
    class NumberSerializer implements Serializable<number> {
        serialize(info: number, options?: SerializationCore.Options): ArrayBuffer;
    }
    class AddressSerializer implements Serializable<string> {
        serialize(info: string, options?: SerializationCore.Options): ArrayBuffer;
        deserialize(buffer: ArrayBuffer): string;
    }
    class AccountAddressSerialization implements Serializable<string> {
        serialize(info: string, options?: SerializationCore.Options): ArrayBuffer;
    }
    class StringSerializer implements Serializable<string> {
        serialize(info: string, options?: SerializationCore.Options): ArrayBuffer;
    }
}
