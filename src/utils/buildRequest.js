export default function buildRequest(url, { body, headers, ...rest } = {}) {
  return {
    ...rest,
    body: body ? JSON.stringify(body) : undefined,
    headers,
  }
}
