# Kraken API universal client
This is a universal API client for the [Kraken API](https://www.kraken.com/en-us/help/api). Universal (sometimes called isomorphic) meaning it works both in the browser and Node.js environments.

## No polyfill needed
As this library prefers to not polyfill `fetch` and `Promise`, it depends on [`fetch-ponyfill`](https://github.com/qubyte/fetch-ponyfill), which is recommended by [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) and uses the browser `window.Promise` and Node `global.Promise`. Therefore, make sure to use a Node version that [implements `Promise`](http://node.green/) (if you follow the "engines" requirement in [`package.json`](package.json), you should be fine).

## API
TBD

## Example
TBD