import {BictoryCnsApi, CnsApi} from '../src/api';
import {ChainInteractor, Environment} from '../src';
import {expect} from 'chai';
import {config} from '../src/config';


describe('should test api', () => {
    it('should test - BictoryCnsApi', async () => {
        const api = new BictoryCnsApi(Environment.TESTNET);
        await api.connect();
        const resolvedAddress = await api.resolve('test60.ccd');
        expect(resolvedAddress).equal('4de1MJ6JtPvMH4Fun3gapaYv73yJhjHTAKdeqT9rWqznWsuMqK');
        const resolvedAddressForInvalidDomainName = await api.resolve('abcd.ccd');
        expect(resolvedAddressForInvalidDomainName).equal('');
    });

    it('should test - CnsApi', async () => {
        const interactor = ChainInteractor.create(config.testnet.nodeIp, config.testnet.nodePort, Environment.TESTNET);

        const api = new CnsApi(
            interactor,
            {
                resolverContractIndex: config.testnet.resolverIndex,
                resolverContractSubIndex: config.testnet.resolverSubIndex
            }
        );
        await api.connect();
        const resolvedAddress = await api.resolve('test60.ccd');
        expect(resolvedAddress).equal('4de1MJ6JtPvMH4Fun3gapaYv73yJhjHTAKdeqT9rWqznWsuMqK');
        const resolvedAddressForInvalidDomainName = await api.resolve('abcd.ccd');
        expect(resolvedAddressForInvalidDomainName).equal('');
    });
});