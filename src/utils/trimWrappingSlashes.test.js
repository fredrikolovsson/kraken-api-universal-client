import trimWrappingSlashes from './trimWrappingSlashes'

describe('trimWrappingSlashes', () => {
  it('returns string without leading or trailing slash', () => {
    const expectedResult = 'test/path'

    expect(trimWrappingSlashes('test/path')).toEqual(expectedResult)
    expect(trimWrappingSlashes('test/path/')).toEqual(expectedResult)
    expect(trimWrappingSlashes('/test/path')).toEqual(expectedResult)
    expect(trimWrappingSlashes('/test/path/')).toEqual(expectedResult)
    expect(trimWrappingSlashes('//test/path//')).toEqual(expectedResult)
  })
})
