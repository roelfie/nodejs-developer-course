const request = require('supertest')
const app = require('../src/app.js')

test('Should signup a new user', async () => {
    // request(app) creates a mock HTTP server
    // providing all endpoints that are defined in that app.
    await request(app)
        .post('/users')
        .send({
            name: 'roelfie',
            email: 'roelfie@depoelfie.nu',
            password: 'Welcome01'
        })
        .expect(201)
})