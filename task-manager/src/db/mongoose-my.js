// const mongoose = require('mongoose')
// const validator = require('validator')

// const DB_NAME = 'task-manager-api'
// const URL = `mongodb://127.0.0.1:27017/${DB_NAME}`

// mongoose.connect(URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         required: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7
//     }
// })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         minlength: 1,
//         maxlength: 100,
//         required: true,
//         trim: true,
//         validate: (v) => !validator.isEmpty(v)
//     },
//     priority: {
//         type: Number,
//         min: 1,
//         max: 10,
//         default: 5
//     },
//     deadline: {
//         type: Date,
//         validate: (d) => validator.isAfter(d.toISOString(), new Date().toISOString()) // only future deadlines
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//         validate(value) {
//             if (value) {
//                 throw new Error('Task must not be completed on creation')
//             }
//         }
//     }
// })

// const user = new User({name: 'roelfie', email: 'roelfie@poelfie.nl', password: 'Welkom01'})
// user.save()
// .then((t) => {
//     console.log('Saved: ' + t)
// }).catch((error) => {
//     console.log(error)
// })

// const task = new Task({description: 'Finish painting', priority: 4, deadline: new Date(2022, 1, 1), completed: false})
// task.save()
// .then((t) => {
//     console.log('Saved: ' + t)
// }).catch((error) => {
//     console.log(error)
// })
                                                                                                                                                                                   