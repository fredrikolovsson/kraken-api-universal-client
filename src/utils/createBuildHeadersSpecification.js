export default function createBuildHeadersSpecification(defaultHeaders = {}) {
  const buildHeadersSpecification = (customHeaders = {}) => {
    const headersSpecification = {
      ...defaultHeaders,
      ...customHeaders,
    }

    return headersSpecification
  }

  return buildHeadersSpecification
}
