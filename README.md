# Kraken API Universal Client
This is an API client for the [**Kraken cryptocurrency exchange API**](https://www.kraken.com/en-us/help/api), with **unit tests** (let us know if there's some test you want to add) and no polyfill.

The API client supports **all methods on Node.js** v6.11.1 or later, and the separately exported public-only client supports calling **public methods from the browser** as well.

## Example
```javascript
// SERVER-SIDE
import KrakenClient from 'kraken-api-universal-client'

const kraken = new KrakenClient({
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
})

// Handles both public and private requests, as long as the provided API
// credentials have the necessary permissions
kraken.request('Assets') // public
  .then(response => { /**/ })
  .catch(error => { /**/ })
kraken.request('TradeBalance', { body: { asset: 'ZEUR' } }) // private
  .then(response => { /**/ })
  .catch(error => { /**/ })

// CLIENT-SIDE
import { createPublicKrakenClient } from 'kraken-api-universal-client'

const publicKraken = createPublicKrakenClient()

// Handles only public requests; will throw error if attempting private requests
publicKraken.request('Assets')
  .then(response => { /* handle response */ })
  .catch(error => { /* handle error */ })
```

## Installation
```
yarn add kraken-api-universal-client
```
or
```
npm install --save kraken-api-universal-client
```

## API
### 1. Import client
The default export is the [client class](./src/client/index.js) and the [`constants`](./src/constants/index.js) are available as a named export, which you can deconstruct to get e.g. the default endpoints. There is also a named export of `createPublicKrakenClient`, the factory for the client-side client that only handles public methods.

```javascript
import KrakenClient, {
  createPublicKrakenClient,
  constants,
} from './index'

const {
  DEFAULT_ENDPOINTS,
  HEADER_API_KEY_KEY,
  HEADER_API_SIGNATURE_KEY,
  HEADER_USER_AGENT_KEY,
  HEADER_USER_AGENT_VALUE,
  PRIVATE,
  PUBLIC,
} = constants
```

### 2. Initialize client
To initialize the client you need an API key and API secret, which you obtain through your Kraken account. For security reasons you should only assign the permissions you truly need to the given API key. If you are going to use the public-only client, you do not need any API credentials.

```javascript
// default, server-side client
const kraken = new KrakenClient({
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
})

// public-only client
const publicKraken = createPublicKrakenClient()
```

### 3. Make requests
```
request(endpointKey: string, options?: {
  body?: object // key-value pairs according to Kraken docs
  fetch?: function // custom-implementation of fetch, used in tests
  nonce?: number // custom nonce, defaults to Number(`${Date.now()}000`)
})
```

To make a request to the Kraken API, call the method `request()` on your initialized client with the `endpointKey`, and optionally with a `body` (containing key-value pairs according to the [Kraken docs](https://www.kraken.com/help/api)), a custom-implementation of `fetch` and/or a custom `nonce` (it defaults to `Date.now()` multiplied by 1000, which was found to satisfy Kraken's requirement of "always increasing unsigned 64 bit integer"). The `endpointKey` is the last part of the Kraken API URL, e.g. like this:

* https://api.kraken.com/0/public/Assets -> endpointKey: 'Assets'
* https://api.kraken.com/0/private/Balance -> endpointKey: 'Balance'

Note that you do not need to specify whether the endpoint is `public` or `private`, the client will know that. If an endpointKey is missing, please submit an issue (and a PR, if you can).

```javascript
// public method
kraken.request('Assets')
  .then(response => { /**/ })
  .catch(error => { /**/ })

// private method without body
kraken.request('Balance')
.then(response => { /**/ })
.catch(error => { /**/ })

// private method with body
kraken.request('TradeBalance', { body: { asset: 'ZEUR' } })
  .then(response => { /**/ })
  .catch(error => { /**/ })
```

### Response/error
The `request` method returns a `Promise`, so use `.then()` and `.catch()` to handle a response or error respectively (as seen in the [example](#Example). Please refer to the [Kraken documentation](https://www.kraken.com/help/api) and the [client code](./src/client/index.js) for the details on how responses and errors are structured.

## No polyfill needed
As this library prefers to not polyfill `fetch` and `Promise`, it depends on [`fetch-ponyfill`](https://github.com/qubyte/fetch-ponyfill), which is recommended by [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) and uses the browser `window.Promise` and Node `global.Promise`. Therefore, make sure to use a Node version that [implements `Promise`](http://node.green/) (if you follow the "engines" requirement in [`package.json`](package.json), you should be fine).

## Credits
Thanks to:

* Kraken for the docs and service.
* [@nothingisdead](https://github.com/nothingisdead)'s [Node Kraken client](https://github.com/nothingisdead/npm-kraken-api) for inspiration.
* [Trevor Miller's](https://trevordmiller.com/) course about publishing NPM packages on [egghead.io](https://egghead.io/courses/publish-javascript-packages-on-npm).

## License
MIT