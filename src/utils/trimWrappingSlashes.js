const FORWARD_SLASH = '/'

export default function trimWrappingSlashes(string = '') {
  if (string[0] === FORWARD_SLASH) {
    return trimWrappingSlashes(string.slice(1))
  }

  if (string[string.length - 1] === FORWARD_SLASH) {
    return trimWrappingSlashes(string.slice(0, -1))
  }

  return string
}
