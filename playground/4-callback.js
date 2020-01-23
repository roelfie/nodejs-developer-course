// Callback pattern
// 
// Based on ONE single callback function, 
// that accepts the error and the result.

const doWorkAsync = (callback) => {
    // Simulate work by waiting for 2 sec.
    setTimeout(() => {
        // Then pass result (or error) to callback function.
        if (true) {
            callback(undefined, 'This is the result of the work')
        } else {
            callback('This error occurred during work', undefined)
        }
    }, 2000)
}

doWorkAsync((error, result) => {
    if (error) {
        return console.log('Work failed. Error: ' + error)
    }
    console.log('Work succeeded. Result: ' + result)
})