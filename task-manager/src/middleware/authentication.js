const jwt = require('jsonwebtoken')
const User = require('../models/user')


// Verify the JWT token and store the corresponding user (from DB) on the request
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const payload = jwt.verify(token, process.env.JWT_SIGNING_KEY)
        const user = await User.findOne({ _id: payload._id, 'tokens.token' : token })
        if (!user) {
            throw new Error('User doesn\'t exist or token not valid for user')
        }
        
        req.token = token // remind what token was used to login, to support logout
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = { 
    authenticate
}