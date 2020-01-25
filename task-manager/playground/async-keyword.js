// Simple illustration of async.
// Instead of returning a Promise with the resolve / reject boilerplate code,
// with 'async' you can just return a value or throw an Error
// (the 'async' keyword makes sure a Promise is still returned).
//
// See promise-chaining-0.js for an example of chained async/awaits.

// Asynchronous code with explicit use of Promise.
const doWork_ = (bool) => {
    return new Promise((resolve, reject) => {
        if (bool) {
            resolve('Success value')
        } else {
            reject(new Error('Error ...'))
        }
    })
}

// Asynchronous code with the 'async' keyword.
// Also returns a Promise, but much more concise code.
const doWork = async (bool) => {
    if (bool) {
        return 'Success value' // = resolve('Success value')
    } else {
        throw new Error('Error ...') // = reject('Error ...')
    }
}

doWork(false).then((result) => {
    console.log(result) // roelfie
}).catch((e) => {
    console.log(e)
})