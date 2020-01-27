const express = require('express')
const User = require('../models/user')
const validateFields = require('../utils/validator')
const auth = require('../middleware/authentication')
const router = new express.Router()

// CREATE USER

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// LOGIN

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// LOGOUT

router.post('/users/logout', auth.authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send('Unable to logout')
    }
})


// LOGOUT (all tokens)

router.post('/users/logoutAll', auth.authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send('Unable to logout')
    }
})


// LIST USERS

router.get('/users', auth.authenticate, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})


// GET USER PROFILE (of logged in user)

router.get('/users/me', auth.authenticate, async (req, res) => {
    // The authentication middleware has authenticated and stored logged in user on request
    res.send(req.user)
})


// UPDATE USER (only yourself!)

router.patch('/users/me', auth.authenticate, async (req, res) => {
    if (!validateFields(req.body, User.schema, ['name','email', 'password'])) {
        return res.status(400).send({error: 'One or more fields can not be updated.'})
    }

    try {
        const updatedFields = Object.keys(req.body)
        updatedFields.forEach((key) => req.user[key] = req.body[key])
        await req.user.save() // mongoose middleware (pre-save hook) for hashing pwd is executed
        res.send(req.user)
    } catch (e) {
        // TODO distinguish between server errors (500) and validation errors (400)
        res.status(400).send(e)
    }
})


// DELETE USER (only yourself!)

router.delete('/users/me', auth.authenticate, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router