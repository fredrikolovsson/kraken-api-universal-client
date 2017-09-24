import fetchPonyfill from 'fetch-ponyfill'

import buildHeaders from './buildHeaders'

const { Headers } = fetchPonyfill()

describe('buildHeaders', () => {
  it('returns instance of Headers on empty input', () => {
    const headers = buildHeaders()

    expect(headers).toBeInstanceOf(Headers)
  })
  it('returns instance of Headers with provided headers', () => {
    const defaultKey = 'defaultKey'
    const defaultValue = 'defaultValue'
    const customKey = 'customKey'
    const customValue = 'customValue'

    const headersSpecification = {
      [customKey]: customValue,
      [defaultKey]: defaultValue,
    }
    const headers = buildHeaders(headersSpecification)

    expect(headers).toBeInstanceOf(Headers)
    expect(headers.get(defaultKey)).toEqual(defaultValue)
    expect(headers.get(customKey)).toEqual(customValue)
  })
})
