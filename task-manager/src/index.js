const app = require('./app')
const port = process.env.TASKMANAGER_HTTP_PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
