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

mapbox.geocode(location, (error, {longitude, latitude, placeName}) => {
    if (error) {
        return logError(error)
    }

    darksky.forecast(longitude, latitude, (error, {summary, temperature, rainProbability:rain}) => {
        if (error) {
            return logError(error)
        }
        console.log(`Het is nu ${summary} in ${placeName}.\nHet is ${temperature} graden Celsius.\nEr is ${rain}% kans op regen.`)
    })
})
