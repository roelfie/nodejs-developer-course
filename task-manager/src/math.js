const calculateTip = (total, tipPercent = 0.25) => total + (total * tipPercent)

const addAsync = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Both nubers must be non-negative!')
            }
            resolve(a+b)
        }, 500)
    })
}

module.exports = {
    calculateTip, 
    addAsync
}