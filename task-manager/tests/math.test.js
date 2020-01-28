const { calculateTip, addAsync } = require('../src/math')

// See Jest documentation for available assertions:
// https://jestjs.io/docs/en/expect
test('Should calculate tip', () => {
    expect(calculateTip(10, 0.3)).toBe(13)
    expect(calculateTip(10)).toBe(12.5)
})

// Test async code (bad)
test('Test async function', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        // Call done() to instruct Jest that asynchronous code has finished.
        // Not ideal, because you don't want test code (done()) in your SUT.
        done()
    }, 2000)
})

// Test async code (good)
test('Test addAsync', (done) => {
    // Assertions go in Promise.then().
    addAsync(2, 2).then((sum) => {
        expect(sum).toBe(4)
        done()
    })
})

// Test async code (good)
test('Test addAsync', async () => {
    // With async/await a call to .done() is not necessary
    const sum = await addAsync(2, 2)
    expect(sum).toBe(4)
})