import createGetEndpointSpecification from './createGetEndpointSpecification'

describe('createGetEndpointSpecification', () => {
  it('throws if endpointSpecifications are missing', () => {
    const attemptCreateGetEndpointSpecification = () => {
      return createGetEndpointSpecification()
    }

    expect(attemptCreateGetEndpointSpecification).toThrow(
      /"endpointSpecifications" are missing/,
    )
  })
  it('creates getEndpointSpecification function', () => {
    const key = 'AssetPairs'
    const specification = {
      method: 'GET',
      path: '/AssetPairs',
      type: 'public',
    }
    const endpointSpecifications = {
      [key]: specification,
    }

    const getEndpointSpecification = createGetEndpointSpecification(
      endpointSpecifications,
    )

    expect(
      typeof createGetEndpointSpecification(endpointSpecifications),
    ).toEqual('function')
    expect(getEndpointSpecification(key)).toEqual(specification)
  })
})
