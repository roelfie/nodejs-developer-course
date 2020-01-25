// Different ways of nesting / chaining asynchronous calls (Promises).
// Eventually with async/await, which is by far the most readable.

// An asynchronous function
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 5) {
                resolve(a + b)
            } else {
                reject('Don\'t add up numbers > 4')
            }
        }, 1000)
    })
}

// Promise nesting
add(2, 2).then((sum) => {
    add(sum, 2).then((sum2) => {
        add(sum2, 2).then((sum3) => {
            console.log('Promise nesting,  sum=' + sum3)
        }).catch((e) => {
            console.log(e)
        })
    }).catch((e) => {
        console.log(e)
    })
}).catch((e) => {
    console.log(e)
})


// Promise chaining (improves readability)
add(2, 2).then((sum) => {
    return add(sum, 2)
}).then((sum2) => {
    return add(sum2, 2)
}).then((sum3) => {
    console.log('Promise chaining, sum=' + sum3)
}).catch((e) => {
    console.log(e)
})

// Promise chaining with async/await
// NB: Even though add() returns a promise, we need the 'async' keyword to get access to 'await'
const doWork = async () => {
    const sum1 = await add(2, 2)    // add() returns a Promise, await returns its 'resolve' value
    const sum2 = await add(sum1, 2)
    const sum3 = await add(sum2, 2)
    return sum3
}
doWork()
.then((sum3) => console.log('Async / await,    sum=' + sum3))
.catch((e) => console.log(e))
