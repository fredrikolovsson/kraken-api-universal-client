export default function createGetEndpointSpecification(endpointSpecifications) {
  if (!endpointSpecifications) {
    throw new Error(`"endpointSpecifications" are missing: must provide object
    with endpoint specifications`)
  }

  const getEndpointSpecification = key => endpointSpecifications[key]
  return getEndpointSpecification
}
