const express = require('express')
require('./db/mongoose') // will ensure mongoose is connected to the database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000 // default port 3000 unless something provided by Heroku

app.use(express.json()) // Expres will automatically parse incoming JSON and store it on 'req.body'
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
