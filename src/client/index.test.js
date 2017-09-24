import KrakenClient, { createPublicKrakenClient, defaultConfigOptions } from './index'
import {
  HEADER_API_KEY_KEY,
  HEADER_API_SIGNATURE_KEY,
  HEADER_USER_AGENT_KEY,
  HEADER_USER_AGENT_VALUE,
  PRIVATE,
  PUBLIC,
} from '../constants'

// this is used to force the tests to run with mock API credentials despite
// using a browser mock of fetch
const OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING = true

describe('client', () => {
  describe('default', () => {
    describe('constructor', () => {
      it(`throws if apiCredentialsForbidden false in browser env. (like this test)
      without override set`, () => {
        const createKrakenClient = () => {
          return new KrakenClient({
            apiCredentialsForbidden: false,
            key: 'key',
            secret: '1234',
          })
        }

        expect(createKrakenClient).toThrow(/used in a browser environment/)
      })
      it('throws if key is missing', () => {
        const createKrakenClient = () => {
          return new KrakenClient({
            OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
            secret: '1234',
          })
        }

        expect(createKrakenClient).toThrow(/"key" is missing/)
      })
      it('throws if secret is missing', () => {
        const createKrakenClient = () => {
          return new KrakenClient({
            key: 'key',
            OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
          })
        }

        expect(createKrakenClient).toThrow(/"secret" is missing/)
      })
      it('returns client when passed key and secret', () => {
        const createKrakenClient = () => {
          return new KrakenClient({
            key: 'key',
            OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
            secret: '1234',
          })
        }
        expect(createKrakenClient).not.toThrow()

        const client = createKrakenClient()
        expect(client).toBeDefined()
      })
      it('sets default config options if no options passed', () => {
        const key = 'key'
        const secret = '1234'

        const client = new KrakenClient({
          key,
          OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
          secret,
        })
        const expectedConfig = {
          ...defaultConfigOptions,
          apiCredentialsForbidden: false,
          key,
          secret,
        }

        expect(client.getConfig()).toEqual(expectedConfig)
      })
      it('accepts config options as additional properties', () => {
        const key = 'key'
        const secret = '1234'
        const options = { timeout: 10 * 1000 }
        const client = new KrakenClient({
          ...options,
          key,
          OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
          secret,
        })
        const expectedConfig = {
          ...defaultConfigOptions,
          ...options,
          apiCredentialsForbidden: false,
          key,
          secret,
        }

        expect(client).toBeDefined()
        expect(client.getConfig()).toEqual(expectedConfig)
      })
    })

    describe('getEndpointSpecification', () => {
      it('returns endpointSpecification', () => {
        const key = 'AssetPairs'
        const endpointSpecifications = {
          [key]: {
            method: 'GET',
            path: '/AssetPairs',
            type: 'public',
          },
        }
        const kraken = new KrakenClient({
          apiBaseUrl: 'https://api.kraken.com',
          endpointSpecifications,
          key: 'key',
          OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
          secret: '1234',
          version: 0,
        })

        expect(kraken.getEndpointSpecification(key)).toEqual(endpointSpecifications[key])
      })
    })

    describe('getHeadersSpecification', () => {
      let kraken
      beforeEach(() => {
        kraken = new KrakenClient({
          key: 'key',
          OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
          secret: '1234',
        })
      })

      it(`returns ${HEADER_USER_AGENT_KEY} header only for public method`, () => {
        const type = PUBLIC
        const stringifiedHeadersSpecification = JSON.stringify(
          kraken.getHeadersSpecification({ path: 'path', type }),
        )

        expect(stringifiedHeadersSpecification).not.toMatch(HEADER_API_KEY_KEY)
        expect(stringifiedHeadersSpecification).not.toMatch(HEADER_API_SIGNATURE_KEY)
        expect(stringifiedHeadersSpecification).toMatch(HEADER_USER_AGENT_KEY)
        expect(stringifiedHeadersSpecification).toMatch(HEADER_USER_AGENT_VALUE)
      })
      it(`returns ${HEADER_USER_AGENT_KEY}, ${HEADER_API_KEY_KEY} and
      ${HEADER_API_SIGNATURE_KEY} headers for private method`, () => {
        const type = PRIVATE
        const stringifiedHeadersSpecification = JSON.stringify(
          kraken.getHeadersSpecification({ path: 'path', type }),
        )

        expect(stringifiedHeadersSpecification).toMatch(HEADER_API_KEY_KEY)
        expect(stringifiedHeadersSpecification).toMatch(HEADER_API_SIGNATURE_KEY)
        expect(stringifiedHeadersSpecification).toMatch(HEADER_USER_AGENT_KEY)
        expect(stringifiedHeadersSpecification).toMatch(HEADER_USER_AGENT_VALUE)
      })
    })

    describe('request', () => {
      let kraken
      beforeEach(() => {
        kraken = new KrakenClient({
          key: 'key',
          OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING,
          secret: '1234',
        })
      })

      afterEach(() => {
        fetch.resetMocks() // eslint-disable-line no-undef
      })

      it('throws if endpointKey is missing', () => {
        const attemptRequest = () => kraken.request()

        expect(attemptRequest).toThrow(/"endpointKey" is missing/)
      })
      it('throws if endpointKey is invalid', () => {
        const attemptRequest = () => kraken.request('invalid')

        expect(attemptRequest).toThrow(/"endpointKey" is invalid/)
      })
      it('calls fetch for valid endpointKey without body', () => {
        const result = { balance: '12345' }
        // prettier-ignore
        const fetchMock = fetch.mockResponseOnce( // eslint-disable-line no-undef
          JSON.stringify({ result }),
        )
        const endpointKey = 'Time'

        expect.assertions(1)
        return expect(kraken.request(endpointKey, { fetch: fetchMock })).resolves.toEqual(result)
      })
      it('calls fetch for valid endpointKey with body', () => {
        const result = { balance: '12345' }
        // prettier-ignore
        const fetchMock = fetch.mockResponseOnce( // eslint-disable-line no-undef
          JSON.stringify({ result }),
        )
        const endpointKey = 'OpenOrders'
        const body = { trades: true }

        expect.assertions(1)
        return expect(kraken.request(endpointKey, { body, fetch: fetchMock })).resolves.toEqual(
          result,
        )
      })
      it('calls fetch for valid endpointKey with body and nonce', () => {
        const result = { balance: '12345' }
        // prettier-ignore
        const fetchMock = fetch.mockResponseOnce( // eslint-disable-line no-undef
          JSON.stringify({ result }),
        )
        const endpointKey = 'OpenOrders'
        const body = { trades: true }
        const nonce = 1234

        expect.assertions(1)
        return expect(
          kraken.request(endpointKey, { body, fetch: fetchMock, nonce }),
        ).resolves.toEqual(result)
      })
      it('throws error if Kraken response contains non-empty error array', () => {
        // prettier-ignore
        const fetchMock = fetch.mockResponseOnce( // eslint-disable-line no-undef
          JSON.stringify({
            error: ['E123:Fatal', 'W123:Missing'],
          }),
        )
        const endpointKey = 'OpenOrders'
        const body = { trades: true }
        const nonce = 1234

        expect.assertions(1)
        return expect(
          kraken.request(endpointKey, { body, fetch: fetchMock, nonce }),
        ).rejects.toMatch('E123:Fatal; W123:Missing')
      })
      it('throws error if Kraken API rejects request', () => {
        // prettier-ignore
        const fetchMock = fetch.mockRejectOnce() // eslint-disable-line no-undef
        const endpointKey = 'OpenOrders'
        const body = { trades: true }
        const nonce = 1234

        expect.assertions(1)
        return expect(
          kraken.request(endpointKey, { body, fetch: fetchMock, nonce }),
        ).rejects.toBeInstanceOf(Error)
      })
    })
  })

  describe('createPublicKrakenClient', () => {
    it('calls KrakenClient with provided parameters and defaults', () => {
      const mockClient = jest.fn()
      const customOptions = {
        timeout: 23,
      }
      const endpointSpecifications = {
        path: 'test',
      }
      const expectedParamsPassedToConstructor = {
        apiCredentialsForbidden: true,
        endpointSpecifications,
        ...customOptions,
      }

      createPublicKrakenClient({
        endpointSpecifications,
        KrakenClientOrMock: mockClient,
        ...customOptions,
      })

      expect(mockClient.mock.calls.length).toBe(1)
      expect(mockClient.mock.calls[0]).toEqual(
        // wrapped in array as it's passed into a constructor called with new?
        [expectedParamsPassedToConstructor],
      )
    })
    it('makes public request', () => {
      const publicClient = createPublicKrakenClient()
      const result = { balance: '12345' }
      // prettier-ignore
      const fetchMock = fetch.mockResponseOnce( // eslint-disable-line no-undef
        JSON.stringify({ result }),
      )
      const endpointKey = 'Time'

      expect.assertions(1)
      return expect(publicClient.request(endpointKey, { fetch: fetchMock })).resolves.toEqual(
        result,
      )
    })
  })
})
