const constants = require('../utils/constants')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        // Unique because it's used as the login key
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    // Keep track of the authentication token(s) issues for this user
    // This adds support for logout (if received token is not in this list, we won't accept it)
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Instance methods
// Generating a JWT (with default algorithm HMAC SHA256 (=HS256))
// See https://www.npmjs.com/package/jsonwebtoken
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const payload = { _id: user._id.toString() }
    const token = jwt.sign(payload, constants.JWT_SIGNING_KEY)

    // Save the issues token on the user
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// Model methods (static)
// Custom method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('No user found for email ' + email)
    }

    // TODO On pwd save we tell bcryptjs to use 8 cycles, here we don't. How does bcryptjs know how to compare the passwords?
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this
    // Only hash the password if it has changed
    // (otherwise we already have the persisted hashed password)
    if (user.isModified('password')) {
        const hashed = await bcrypt.hash(user.password, 8)
        this.password = hashed    
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User