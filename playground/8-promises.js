// Promise pattern
//
// Based on TWO functions: resolve and reject

const doWorkAsync = new Promise((resolve, reject) => {
    // Simulate work by waiting for 2 sec.
    setTimeout(() => {
        // Then call resolve or reject (depending on outcome).
        if (false) { 
            resolve('This is the result of the work')
        } else {
            reject('This error occurred during work')
        }
    }, 2000)
})

doWorkAsync
    .then((result) => {
        console.log('Work succeeded. Result: ' + result)
    })
    .catch((error) => {
        console.log('Work failed. Error: ' + error)
    })

