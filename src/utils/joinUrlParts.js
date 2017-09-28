import trimWrappingSlashes from './trimWrappingSlashes'

const FORWARD_SLASH = '/'

export default function joinUrlParts(arrayOfStrings = []) {
  return arrayOfStrings.map(trimWrappingSlashes).join(FORWARD_SLASH)
}
