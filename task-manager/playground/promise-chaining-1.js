require('../src/db/mongoose')
const User = require('../src/models/user')

// Chaining mongoose promises: findByIdAndUpdate() + count()
// User.findByIdAndUpdate('5e2b6c3c9145540fddf32c29', { name: 'roelfie2' }, { new: true }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ name: 'roelfie' })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5c1a5a34d5a2ec046ca8f6bc', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})