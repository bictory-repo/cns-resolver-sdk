import bs58check from "bs58check";

export namespace SerializationCore {
  export type Options = {
    lengthInBytes?: number;
  };

  export interface Serializable<T> {
    serialize(info: T, options?: Options): ArrayBuffer;
  }

  export class NumberSerializer implements Serializable<number> {
    serialize(info: number, options?: SerializationCore.Options): ArrayBuffer {
      let hexDecimal = info.toString(16);
      if (hexDecimal.length % 2 === 1) {
        hexDecimal = `0${hexDecimal}`;
      }
      const split = hexDecimal.match(/.{2}/g)?.reverse() || [];
      const array = split.map((hex) => parseInt(hex, 16));
      const length = options.lengthInBytes || 4;
      const buffer = new ArrayBuffer(length);
      const dataView = new DataView(buffer);
      for (let i = 0; i < array.length; i++) {
        dataView.setUint8(i, array[i]);
      }

      return buffer;
    }
  }

  export class AddressSerializer implements Serializable<string> {
    serialize(info: string, options?: SerializationCore.Options): ArrayBuffer {
      const result = new ArrayBuffer(33);
      const addressBytes = bs58check.decode(info); // 32
      const dataView = new DataView(result);
      dataView.setUint8(0, 0);
      for (let i = 1; i < addressBytes.length; i++) {
        dataView.setUint8(i, addressBytes[i]);
      }

      return result;
    }

    deserialize(buffer: ArrayBuffer): string {
      const data = new Uint8Array(buffer);
      const result = new ArrayBuffer(data.length);
      const dataView = new DataView(result);
      dataView.setUint8(0, 1);
      for (let i = 1; i < data.length; i++) {
        dataView.setUint8(i, data[i]);
      }
      return bs58check.encode(Buffer.from(result));
    }
  }

  export class AccountAddressSerialization implements Serializable<string> {
    serialize(info: string, options?: SerializationCore.Options): ArrayBuffer {
      const result = new ArrayBuffer(32);
      const addressBytes = bs58check.decode(info);
      const dataView = new DataView(result);
      for (let i = 1; i < addressBytes.length; i++) {
        dataView.setUint8(i - 1, addressBytes[i]);
      }

      return result;
    }
  }

  export class StringSerializer implements Serializable<string> {
    serialize(info: string, options?: SerializationCore.Options): ArrayBuffer {
      return new Uint8Array(Buffer.from(info)).buffer;
    }
  }
}
