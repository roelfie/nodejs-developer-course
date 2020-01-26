const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
    }
})

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