const mongoose = require('mongoose')

mongoose.connect(process.env.TASKMANAGER_MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
