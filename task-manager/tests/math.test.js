const { calculateTip } = require('../src/math')

// See Jest documentation for available assertions:
// https://jestjs.io/docs/en/expect
test('Should calculate tip', () => {
    expect(calculateTip(10, 0.3)).toBe(13)
    expect(calculateTip(10)).toBe(12.5)
})