import { expect } from "chai";
import { SerializationCore } from "../src/serialization/core";
import AddressSerialization = SerializationCore.AddressSerializer;
import NumberSerialization = SerializationCore.NumberSerializer;


describe('Serialization Core Methods', () => {
    it('Number serialization', () => {
        const serialization = new NumberSerialization();
        const result = serialization.serialize(200, { lengthInBytes: 4 })
        expect(result.byteLength).to.equal(4)
        const hexValue = `0x${Buffer.from(result).toString('hex')}`;
        expect(hexValue).to.equal('0xc8000000')
    });

    it('Address Serialization', () => {
        const serialization = new AddressSerialization();
        const result = serialization.serialize('3vN6LBZhpoL6qNodJDMvMayaRs4cYDqg12VLHLsVLhKavUk8Ws');
        expect(result.byteLength).to.equal(33);
    });
});