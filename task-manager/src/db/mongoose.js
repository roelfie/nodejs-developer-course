const mongoose = require('mongoose')

const DB_NAME = 'task-manager-api'
const URL = `mongodb://127.0.0.1:27017/${DB_NAME}`

mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})