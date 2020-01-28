const express = require('express')
require('./db/mongoose')
const maintenance = require('./middleware/maintenance')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(maintenance) // Example of global middleware (applicable to all endpoints)
app.use(express.json()) // Express will automatically parse incoming JSON and store it on 'req.body'
app.use(userRouter)
app.use(taskRouter)

module.exports = app