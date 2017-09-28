import createBuildHeadersSpecification from './createBuildHeadersSpecification'

describe('createBuildHeadersSpecification', () => {
  it('creates buildHeadersSpecification function without defaultHeaders', () => {
    expect(typeof createBuildHeadersSpecification()).toBe('function')
  })
  it('creates buildHeadersSpecification function with defaultHeaders', () => {
    const defaultHeaders = {
      'user-agent': 'my agent',
    }
    expect(typeof createBuildHeadersSpecification(defaultHeaders)).toBe(
      'function',
    )
  })

  describe('buildHeadersSpecification', () => {
    it('returns object with default headers specification', () => {
      const defaultKey = 'defaultKey'
      const defaultValue = 'defaultValue'
      const defaultHeaders = {
        [defaultKey]: defaultValue,
      }
      const buildHeadersSpecification = createBuildHeadersSpecification(
        defaultHeaders,
      )
      const headersSpecification = buildHeadersSpecification()

      const expectedResult = {
        ...defaultHeaders,
      }

      expect(headersSpecification).toEqual(expectedResult)
    })

    it('returns object with combined default and custom headers specification', () => {
      const defaultKey = 'defaultKey'
      const defaultValue = 'defaultValue'
      const defaultHeaders = {
        [defaultKey]: defaultValue,
      }
      const buildHeadersSpecification = createBuildHeadersSpecification(
        defaultHeaders,
      )

      const customKey = 'customKey'
      const customValue = 'customValue'
      const customHeaders = {
        [customKey]: customValue,
      }
      const headersSpecification = buildHeadersSpecification(customHeaders)

      const expectedResult = {
        ...defaultHeaders,
        ...customHeaders,
      }

      expect(headersSpecification).toEqual(expectedResult)
    })
  })
})
