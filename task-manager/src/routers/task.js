const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/authentication')
const validateFields = require('../utils/validator')
const router = new express.Router()


router.post('/tasks', auth.authenticate, async (req, res) => {
    const task = new Task({
        // ES6 spread syntax (all fields of req.body are added)
        ...req.body, 
        owner: req.user._id
    })
    try {
        await task.save()
        await task.populate('owner').execPopulate() // replace id with complete user object
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20   (3nd page of 10 results)
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth.authenticate, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = (req.query.completed === 'true')
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1)
    }

    try {
        await req.user.populate({ 
            path: 'tasks', 
            match,
            // The following options for pagination mimic pagination with MongoDB cursors
            // (https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr). 
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks) // tasks is a virtual property in the user model
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})


router.get('/tasks/:id', auth.authenticate, async (req, res) => {
    try {
        // Logged in user can only see his own tasks
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.patch('/tasks/:id', auth.authenticate, async (req, res) => {
    console.log('going validating')
    if (!validateFields(req.body, Task.schema)) {
        return res.status(400).send({error: 'One or more fields can not be updated.'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }

        const updatedFields = Object.keys(req.body)
        updatedFields.forEach((key) => task[key] = req.body[key])
        await task.save()

        res.send(task)
    } catch (e) {
        // TODO distinguish between server errors (500) and validation errors (400)
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth.authenticate, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router