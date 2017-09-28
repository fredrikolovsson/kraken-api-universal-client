export default function createGetConfig(options) {
  if (!options) {
    throw new Error('"options" are missing: must provide object with options')
  }

  // returning shallow copy to ensure options are immutable
  const getConfig = () => ({ ...options })
  return getConfig
}
