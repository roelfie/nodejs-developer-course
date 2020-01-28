const express = require('express')
require('./db/mongoose') // will ensure mongoose is connected to the database
const maintenance = require('./middleware/maintenance')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.TASKMANAGER_HTTP_PORT

// global middleware registration (see ./routers/user.js for endpoint specific)
app.use(maintenance)

app.use(express.json()) // Expres will automatically parse incoming JSON and store it on 'req.body'
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
