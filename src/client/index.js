import fetchPonyfill from 'fetch-ponyfill'

import {
  DEFAULT_ENDPOINTS,
  HEADER_API_KEY_KEY,
  HEADER_API_SIGNATURE_KEY,
  HEADER_USER_AGENT_KEY,
  HEADER_USER_AGENT_VALUE,
  PRIVATE,
} from '../constants'
import {
  buildRequest,
  createBuildApiSignature,
  createBuildEndpointUrl,
  createBuildHeadersSpecification,
  createGetEndpointSpecification,
  createGetConfig,
  joinUrlParts,
} from '../utils'

const { fetch: DEFAULT_FETCH } = fetchPonyfill()

/* eslint-disable no-undef */
const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
/* eslint-enable no-undef */

const defaultHeadersSpecification = {
  'Content-Type': 'application/json',
  [HEADER_USER_AGENT_KEY]: HEADER_USER_AGENT_VALUE,
}

export const defaultConfigOptions = {
  apiUrl: 'https://api.kraken.com',
  timeout: 60 * 1000,
  version: 0,
}

class KrakenClient {
  constructor(
    {
      apiCredentialsForbidden = false,
      endpointSpecifications = DEFAULT_ENDPOINTS,
      key = '',
      OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING = false,
      secret = '',
      ...options
    } = {},
  ) {
    if (!apiCredentialsForbidden) {
      if (isBrowser && !OVERRIDE_BROWSER_CHECK_ONLY_FOR_TESTING) {
        throw new Error(
          `It seems this is used in a browser environment and then it is only
          allowed to use the public client, which does not require any API
          credentials. It is exported as a named export.`,
        )
      }

      if (!key) {
        throw new Error(
          '"key" is missing: constructor must be called with Kraken API key',
        )
      }

      if (!secret) {
        throw new Error(
          `"secret" is missing: constructor must be called with Kraken API
          secret`,
        )
      }
    }

    this.getConfig = createGetConfig({
      ...defaultConfigOptions,
      ...options,
      apiCredentialsForbidden,
      key,
      secret,
    })

    const { apiUrl, version } = this.getConfig()
    const baseUrl = joinUrlParts([apiUrl, version])

    this.buildApiSignature = apiCredentialsForbidden
      ? null
      : createBuildApiSignature(secret)
    this.buildEndpointUrl = createBuildEndpointUrl(baseUrl)
    this.buildHeadersSpecification = createBuildHeadersSpecification(
      defaultHeadersSpecification,
    )
    this.getEndpointSpecification = createGetEndpointSpecification(
      endpointSpecifications,
    )
  }

  getHeadersSpecification({ body, nonce, path, type: endpointType }) {
    if (endpointType === PRIVATE) {
      const { key } = this.getConfig()
      return this.buildHeadersSpecification({
        [HEADER_API_KEY_KEY]: key,
        [HEADER_API_SIGNATURE_KEY]: this.buildApiSignature({
          body,
          nonce,
          path,
        }),
      })
    }

    return this.buildHeadersSpecification()
  }

  request(
    endpointKey,
    { body, fetch = DEFAULT_FETCH, nonce = Number(`${Date.now()}000`) } = {},
  ) {
    if (!endpointKey) {
      throw new Error(
        `"endpointKey" is missing: publicGet requires an endpointKey, according
        to this pattern: https://api.kraken.com/{version}/{type}/{endpointKey}`,
      )
    }

    const endpointSpecification = this.getEndpointSpecification(endpointKey)

    if (!endpointSpecification) {
      throw new Error(
        `"endpointKey" is invalid: publicGet requires a case-sensitive
        endpointKey, according to this pattern:
        https://api.kraken.com/{version}/{type}/{endpointKey}

        Check the correct endpointKey on https://www.kraken.com/help/api and
        raise an issue on GitHub if the endpointKey is missing from
        constants/endpoints.`,
      )
    }

    const { method, path, type } = endpointSpecification
    const { apiCredentialsForbidden, timeout } = this.getConfig()

    if (apiCredentialsForbidden && type === PRIVATE) {
      throw new Error(
        `${endpointKey} is a private method and cannot be called with the public
        client. Please use the default client instead.`,
      )
    }

    const methodDependentBody =
      method === 'GET'
        ? undefined
        : {
          ...body,
          nonce,
        }

    const url = this.buildEndpointUrl(path)

    const headers = this.getHeadersSpecification({
      body: methodDependentBody,
      nonce,
      path: `/0${path}`,
      type,
    })

    const request = buildRequest(url, {
      body: methodDependentBody,
      headers,
      method,
      timeout,
    })

    /*
    * Responses are JSON encoded in the form of:
    *   error = array of error messages in the format of:
    *     <char-severity code><string-error category>:<string-error type>[:
    *       <string-extra info>]
    *     severity code can be E for error or W for warning
    *   result = result of API call (may not be present if errors occur)
    */
    return fetch(url, request)
      .then(response => {
        return response.json().then(({ error, result }) => {
          if (error && error.length) {
            throw error.join('; ')
          }

          return result
        })
      })
      .catch(error => {
        if (!error) {
          throw new Error('Kraken API rejected the request with unknown error')
        }

        throw error
      })
  }
}

export const createPublicKrakenClient = (
  {
    endpointSpecifications = DEFAULT_ENDPOINTS,
    KrakenClientOrMock = KrakenClient,
    ...options
  } = {},
) =>
  new KrakenClientOrMock({
    apiCredentialsForbidden: true,
    endpointSpecifications,
    ...options,
  })

export default KrakenClient
