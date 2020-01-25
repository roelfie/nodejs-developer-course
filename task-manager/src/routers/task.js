const express = require('express')
const Task = require('../models/task')
const validateFields = require('../utils/validator')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/tasks/:id', async (req, res) => {
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


router.patch('/tasks/:id', async (req, res) => {
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


router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router