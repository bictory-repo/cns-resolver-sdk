import {ChainInteractor, Environment} from "../src";
import {expect} from "chai";
import {config} from '../src/config';


describe('Initial test', () => {
    it('client-connection', async () => {
        const interactor = ChainInteractor.create(config.testnet.nodeIp, config.testnet.nodePort, Environment.TESTNET);
        const client = await interactor.connect()

        expect(client).to.not.equal(undefined);
    });
});