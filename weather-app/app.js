/*
 * A weather app that makes use of the darksky.net API.
 */ 
const request = require('request')

const url = 'https://api.darksky.net/forecast/098ecebd570eb0bb08b6acbf12629b5b/37.8267,-122.4233'

request({url: url}, (error, response) => {
    const weatherData = JSON.parse(response.body)
    console.log(weatherData.currently)
})
