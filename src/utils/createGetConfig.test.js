import createGetConfig from './createGetConfig'

describe('createGetConfig', () => {
  it('throws if options are missing', () => {
    const attemptCreateGetConfig = () => {
      return createGetConfig()
    }

    expect(attemptCreateGetConfig).toThrow(/"options" are missing/)
  })
  it('creates getConfig function', () => {
    const options = {
      apiBaseUrl: 'https://api.kraken.com',
      timeout: 60 * 1000,
      version: 0,
    }

    const getConfig = createGetConfig(options)

    expect(typeof getConfig).toEqual('function')
  })
  it('returns options', () => {
    const options = {
      apiBaseUrl: 'https://api.kraken.com',
      timeout: 60 * 1000,
      version: 0,
    }

    const getConfig = createGetConfig(options)

    expect(getConfig()).toEqual(options)
  })
  it('returns new object every time', () => {
    const options = {
      apiBaseUrl: 'https://api.kraken.com',
      timeout: 60 * 1000,
      version: 0,
    }

    const getConfig = createGetConfig(options)

    const optionsCopy1 = getConfig()
    const optionsCopy2 = getConfig()

    expect(optionsCopy1).not.toBe(optionsCopy2)
  })
})
