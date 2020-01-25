const express = require('express')
const User = require('../models/user')
const validateFields = require('../utils/validator')
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(err)
    }
})


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})


router.get('/users/:id', async (req, res) => {
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


router.patch('/users/:id', async (req, res) => {
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


router.delete('/users/:id', async (req, res) => {
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


module.exports = router