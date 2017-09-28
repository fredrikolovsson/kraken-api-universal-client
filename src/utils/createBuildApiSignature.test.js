import createBuildApiSignature from './createBuildApiSignature'

describe('createBuildApiSignature', () => {
  it('throws if secret is missing', () => {
    const attemptCreateGetSignature = () => {
      return createBuildApiSignature()
    }

    expect(attemptCreateGetSignature).toThrow(/"secret" is missing/)
  })
  it('creates buildApiSignature function', () => {
    expect(typeof createBuildApiSignature('1234')).toBe('function')
  })

  describe('buildApiSignature', () => {
    let buildApiSignature
    beforeEach(() => {
      const secret = '1234'
      buildApiSignature = createBuildApiSignature(secret)
    })

    it('throws if path is missing', () => {
      const attemptGetSignature = () => {
        return buildApiSignature({
          body: { timeout: 10000 },
          nonce: 1,
        })
      }

      expect(attemptGetSignature).toThrow(/"path" is missing/)
    })
    it('returns an 88 character string', () => {
      const signature = buildApiSignature({
        body: { timeout: 10000 },
        nonce: 1,
        path: 'path',
      })
      const type = typeof signature

      expect(signature).toHaveLength(88)
      expect(type).toEqual('string')
    })
  })
})
