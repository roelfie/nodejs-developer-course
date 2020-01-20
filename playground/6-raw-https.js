/*
 * Throughout this course we use the npm package 'request' for HTTP calls.
 * We will not use Node.js own HTTP(S) core modules,
 * but here is an example of how to use them...
 */

require('dotenv').config({path: '/Users/roelfie/.config/_roelfie/nodejs-developer-course.conf'})
const https = require('https')

const apiKey = process.env.WEATHER_APP_DARKSKY_API_KEY
const url = `hts://api.darksky.net/forecast/${apiKey}/47,8?lang=nl&units=si`

const request = https.request(url, (response) => {

    let data = ''

    // Callback to collect data
    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    // Callback to execute when all data received
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

// Error handling
request.on('error', (error) => {
    console.log(error)
})

request.end()