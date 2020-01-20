const request = require('request')

const apiKey_Darksky = process.env.WEATHER_APP_DARKSKY_API_KEY
const urlDarkSky = `https://api.darksky.net/forecast/${apiKey_Darksky}/{LATITUDE},{LONGITUDE}?lang=nl&units=si`

const forecast = (longitude, latitude, callback) => {
    var url = urlDarkSky.replace('{LONGITUDE}', encodeURIComponent(longitude))
                        .replace('{LATITUDE}', encodeURIComponent(latitude))

    request({url, json: true, lang: 'en'}, (error, {body}) => {
        if (error) { // low level error
            callback("Error calling darksky: " + error)
        } else if (body.error) { // darksky specific error
            callback("Error calling darksky: " + body.error)
        } else {
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
