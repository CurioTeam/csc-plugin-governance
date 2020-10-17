# Curio Stablecoin Governance Plugin

A [dai.js](https://github.com/makerdao/dai.js) plugin for interacting with the Curio Stablecoin governance system. This plugin makes it easy to integrate Curio Stablecoin governance into frontend applications. You can use it to vote, cast proposals, query the voting contract, create a vote proxy, and much more.

## Installation

The Curio Stablecoin Governance Plugin requires **dai.js 0.9.2 or later.**

```shell script
yarn add https://github.com/CurioTeam/csc-plugin-governance
```

## Examples

We will have several examples once the api is more stable. Here is one to give you some sense of how this plugin can be used:

```js
import governancePlugin from 'csc-plugin-governance';
import Maker from '@makerdao/dai';

(async () => {
  const maker = Maker.create('browser', {
    plugins: [governancePlugin]
  });
  await maker.authenticate();
  await maker.service('chief').lock(10);
})();
```

This example will initiate a MetaMask transaction to lock 10 CGT into the voting system.

### Development

## Getting started

_Note: this project utilizes the [yarn](https://yarnpkg.com/en/) package manager_

Clone this repo

```
$ git clone https://github.com/CurioTeam/csc-plugin-governance.git
```

Install project dependencies

```
$ yarn
$ yarn install --cwd "gov-testchain"
```

## Running Tests

1.  Install [dapptools](https://dapp.tools/)
1.  `yarn testnet --ci yarn test`

## Publishing

Publish to NPM

```
$ yarn deploy
```

## Code Style

We run Prettier on-commit, which means you can write code in whatever style you want and it will be automatically formatted according to the common style when you run `git commit`.

### License

[MIT licensed](./LICENSE)
