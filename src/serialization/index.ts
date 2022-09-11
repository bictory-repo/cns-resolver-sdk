import { arrayBufferToIterable } from "../utils/parse";
import { SerializationCore } from "./core";

export class SerializationResolver {
  constructor(
    private readonly numberSerializer: SerializationCore.NumberSerializer,
    private readonly addressSerializer: SerializationCore.AddressSerializer,
    private readonly stringSerializer: SerializationCore.StringSerializer
  ) {}

  register(domain: string, address: string, duration: number): ArrayBuffer {
    const domainBuffer = arrayBufferToIterable(
      this.stringSerializer.serialize(domain)
    );
    const addressBuffer = arrayBufferToIterable(
      this.addressSerializer.serialize(address)
    );
    const durationBuffer = arrayBufferToIterable(
      this.numberSerializer.serialize(duration, { lengthInBytes: 1 })
    );

    return Buffer.from([...domainBuffer, ...addressBuffer, ...durationBuffer]);
  }

  extend(domain: string, address: string): ArrayBuffer {
    const domainBuffer = arrayBufferToIterable(
      this.stringSerializer.serialize(domain)
    );
    const addressBuffer = arrayBufferToIterable(
      this.addressSerializer.serialize(address)
    );

    return Buffer.from([...domainBuffer, ...addressBuffer]);
  }

  setAddress(domain: string, address: string): ArrayBuffer {
    const domainBuffer = arrayBufferToIterable(
      this.stringSerializer.serialize(domain)
    );
    const addressBuffer = arrayBufferToIterable(
      this.addressSerializer.serialize(address)
    );

    return Buffer.from([...domainBuffer, ...addressBuffer]);
  }

  resolve(domain: string): ArrayBuffer {
    const domainBuffer = arrayBufferToIterable(
      this.stringSerializer.serialize(domain)
    );
    const lengthBuffer = arrayBufferToIterable(
      this.numberSerializer.serialize(domainBuffer.length, { lengthInBytes: 4 })
    );

    return Buffer.from([...lengthBuffer, ...domainBuffer]);
  }

  deserializeAddress(buffer: ArrayBuffer): string {
    return this.addressSerializer.deserialize(buffer);
  }
}
