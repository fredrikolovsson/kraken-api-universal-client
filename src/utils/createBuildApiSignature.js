import { createHash, createHmac } from 'crypto-browserify'
// note: the trailing slash is important: https://github.com/feross/buffer#usage
import { Buffer as BrowserCompatibleBuffer } from 'buffer/'

export default function createBuildApiSignature(secret) {
  if (!secret) {
    throw new Error('"secret" is missing: must provide Kraken API secret')
  }

  /* Create API message signature according to Kraken specification:
  * "Message signature using HMAC-SHA512 of
  * (URI path + SHA256(nonce + POST data))
  * and base64 decoded secret API key"
  * https://www.kraken.com/en-us/help/api#general-usage
  */
  const buildApiSignature = ({ body = {}, nonce, path } = {}) => {
    if (!path) {
      throw new Error('"path" is missing: must provide Kraken API path')
    }

    const encodedSecret = new BrowserCompatibleBuffer(secret, 'base64')

    const sha256 = createHash('sha256')
      .update(String(nonce) + JSON.stringify(body))
      .digest('binary')

    const hmacSha512 = createHmac('sha512', encodedSecret)
      .update(path + sha256, 'binary')
      .digest('base64')

    return hmacSha512
  }

  return buildApiSignature
}
