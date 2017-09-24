import fetchPonyfill from 'fetch-ponyfill'

import buildRequest from './buildRequest'

const { Headers } = fetchPonyfill()

describe('buildRequest', () => {
  it('returns request with stringified body', () => {
    const headers = new Headers()
    headers.append('User-Agent', 'User-Agent')

    const init = {
      body: { pair: 'XBTEUR' },
      headers,
      method: 'POST',
    }
    const url = 'https://api.kraken.com/0/private/AddOrder'

    const req = buildRequest(url, init)

    expect(req).toEqual({
      ...init,
      body: JSON.stringify(init.body),
    })
  })
})
