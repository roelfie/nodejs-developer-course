const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const app = require('../src/app.js')

const User = require('../src/models/user')
const Task = require('../src/models/task')

const USER_ID = new mongoose.Types.ObjectId()
const USER = { 
    _id: USER_ID, 
    name: 'Bernie', 
    email: 'bernie@somewhere.nl', 
    password: 'Welcome01',
    tokens: [{
        token: jwt.sign({ _id: USER_ID }, process.env.JWT_SIGNING_KEY)
    }]
}
const USER_NEW = { name: 'Andrew', email: 'andrew@company.com',  password: 'Welcome01' }

beforeEach(async () => {
    const resTasks = await Task.deleteMany({})
    const resUsers = await User.deleteMany({})
    console.log(`Removed ${resUsers.deletedCount} users and ${resTasks.deletedCount} tasks from the database.`)

    await new User(USER).save()
});

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send(USER_NEW)
        .expect(201)

    // Assert that user is in the database.
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    // Assert that response contains *at least* some fields
    expect(response.body.user).toMatchObject({
        name: 'Andrew'
    })
})

test('Should login', async () => {
    await request(app)
        .post('/users/login')
        .send({ email: USER.email, password: USER.password })
        .expect(200)
})

test('Should fail login in wrong password', async () => {
    await request(app)
        .post('/users/login')
        .send({ email: USER.email, password: USER.password + '^$%*$#@' })
        .expect(400)
})

test('Should not load user profile if not logged in', async () => {
    await request(app)
        .get('/users/me')
        .expect(401)
})

test('Should load user profile if logged in', async () => {
    await request(app)
        .get('/users/me')
        // Set HTTP header with the authorization token
        .set('Authorization', `Bearer ${USER.tokens[0].token}`)
        .send()
        .expect(200)
        .then(response => {
            expect(response.body.name).toBe('Bernie')
            expect(response.body.email).toBe('bernie@somewhere.nl')
            console.log(response.body)
        })
})
