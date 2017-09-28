import fetchPonyfill from 'fetch-ponyfill'

const { Headers } = fetchPonyfill()

export default function buildHeaders(headersSpecification = {}) {
  const headers = new Headers()

  Object.keys(headersSpecification).forEach(key => {
    headers.append(key, headersSpecification[key])
  })

  return headers
}
