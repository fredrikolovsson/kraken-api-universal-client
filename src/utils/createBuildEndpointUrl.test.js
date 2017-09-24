import createBuildEndpointUrl from './createBuildEndpointUrl'

describe('createBuildEndpointUrl', () => {
  it('throws if base is missing', () => {
    const attemptCreateBuildEndpointUrl = () => {
      return createBuildEndpointUrl()
    }

    expect(attemptCreateBuildEndpointUrl).toThrow(/"base" is missing/)
  })
  it('creates buildEndpointUrl function', () => {
    expect(typeof createBuildEndpointUrl('http://api.com')).toBe('function')
  })

  describe('buildEndpointUrl', () => {
    it('returns url', () => {
      const base = 'http://api.com'
      const path = '/path'
      const buildEndpointUrl = createBuildEndpointUrl(base)
      const expectedUrl = 'http://api.com/path'

      expect(buildEndpointUrl(path)).toEqual(expectedUrl)
    })
  })
})
