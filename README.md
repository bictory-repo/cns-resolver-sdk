# @bictory/cns-resolver - [Concordium](https://concordium.com) CNS Resolver lib

The lib helps to work with CNS Smartcontracts directly.

## Installation

Use the package manager [npm](https://nodejs.org/en/) or [yarn](https://yarnpkg.com/) to install @bictory/cns-resolver.

```bash
npm install @bictory/cns-resolver
```

OR

```bash
yarn add @bictory/cns-resolver
```


## Usage
There are two possibilities to use the lib:
1. Using [Bictory](https://bictory.io/)'s Concordium Node details:
```javascript
import { BictoryCnsApi, Environment } from '@bictory/cns-resolver';

// Specify here TESTNET or MAINNET
const api = new BictoryCnsApi(Environment.TESTNET)
```
2. If you want to use your own Concordium Node:
```javascript
import { CnsApi } from '@bictory/cns-resolver';

// Specify here TESTNET or MAINNET
const api = new CnsApi(<your_node_ip>,  <your_node_port>, Environment.TESTNET); 
```

## Resolve Method:

```javascript
import { BictoryCnsApi, Environment } from '@bictory/cns-resolver';

// Specify here TESTNET or MAINNET
const api = new BictoryCnsApi(Environment.TESTNET)

// before use each function, api client should be called connect method
await api.connect()

// then you can use resolve method 
const address = await api.resolve('my_domain.ccd');

// should return the address which the domain name belongs to
// if address can't be found resolve method returns an empty string ''
```

## Support

Don't use this lib on Front end directly. Interaction front end with CNS Smartcontracts should be performed via web service!. [This](https://github.com/bictory-repo/ccd-cns-api-template) is a simple node js example that you can use and improve for your goals.


## License
MIT