/*
 * A weather app that makes use of the darksky and mapbox APIs.
 */ 
require('dotenv').config({path: '/Users/roelfie/.config/_roelfie/nodejs-developer-course.conf'})
const chalk = require('chalk')
const mapbox = require('./utils/mapbox')
const darksky = require('./utils/darksky')

const logError = (e) => console.log(chalk.red.inverse(e))

const location = process.argv[2]

if (!location) {
    return logError("Missing required argument. Provide a location!")
}

mapbox.geocode(location, (error, geoData) => {
    if (error) {
        return logError(error)
    }
    
    darksky.forecast(geoData.longitude, geoData.latitude, (error, forecastData) => {
        if (error) {
            return logError(error)
        }
        // ES6 object destructuring: 
        const {summary, temperature, rainProbability:rain} = forecastData
        console.log(`Het is nu ${summary} in ${geoData.placeName}.\nHet is ${temperature} graden Celsius.\nEr is ${rain}% kans op regen.`)
    })
})
