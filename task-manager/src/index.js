const express = require('express')
require('./db/mongoose') // will ensure mongoose is connected to the database
const validateFields = require('./utils/validator')
// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 // default port 3000 unless something provided by Heroku

app.use(express.json()) // Expres will automatically parse incoming JSON and store it on 'req.body'
// app.use(userRouter)
// app.use(taskRouter)

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(err)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    if (!validateFields(req.body, User.schema, ['name','email'])) {
        return res.status(400).send({error: 'One or more fields can not be updated.'})
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true, // return new user instead of original one.
                runValidators: true
            })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        // TODO distinguish between server errors (500) and validation errors (400)
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    console.log('going validating')
    if (!validateFields(req.body, Task.schema)) {
        return res.status(400).send({error: 'One or more fields can not be updated.'})
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true, // return new task instead of original one.
                runValidators: true
            })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        // TODO distinguish between server errors (500) and validation errors (400)
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
