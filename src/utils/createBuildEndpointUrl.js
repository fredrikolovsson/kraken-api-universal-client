import joinUrlParts from './joinUrlParts'

export default function createBuildEndpointUrl(base) {
  if (!base) {
    throw new Error('"base" is missing: must provide API base url')
  }

  const buildEndpointUrl = path => {
    return joinUrlParts([base, path])
  }

  return buildEndpointUrl
}
