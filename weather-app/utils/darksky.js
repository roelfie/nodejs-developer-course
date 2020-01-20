const request = require('request')

const apiKey = process.env.WEATHER_APP_DARKSKY_API_KEY
const urlTemplate = `https://api.darksky.net/forecast/${apiKey}/{LATITUDE},{LONGITUDE}?lang=nl&units=si`

const forecast = (longitude, latitude, callback) => {
    url = urlTemplate.replace('{LONGITUDE}', encodeURIComponent(longitude))
                     .replace('{LATITUDE}', encodeURIComponent(latitude))

    request({url, json: true, lang: 'en'}, (error, {body}) => {
        if (error) { // low level error
            callback("Error calling darksky: " + error)
        } else if (body.error) { // darksky specific error
            callback("Error calling darksky: " + body.error)
        } else {
            console.log(body)
            // ES6 object destructuring:
            const {temperature, precipProbability:rainProbability} = body.currently 
            callback(undefined, {
                summary: body.currently.summary.toLowerCase(),
                // ES6 object property value shorthand (property gets same name & value as variable):
                temperature,
                rainProbability
            })
        }
    })    
}

module.exports = {
    forecast: forecast
}
