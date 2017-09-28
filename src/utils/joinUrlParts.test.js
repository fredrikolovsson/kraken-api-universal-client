import joinUrlParts from './joinUrlParts'

describe('joinUrlParts', () => {
  it('returns string with parts joined by forward slash', () => {
    const expectedResult = 'test/path'

    expect(joinUrlParts(['test', '/path'])).toEqual(expectedResult)
    expect(joinUrlParts(['test', '/path/'])).toEqual(expectedResult)
    expect(joinUrlParts(['/test', '/path'])).toEqual(expectedResult)
    expect(joinUrlParts(['/test', '/path/'])).toEqual(expectedResult)
    expect(joinUrlParts(['//test', '/path//'])).toEqual(expectedResult)
  })
})
