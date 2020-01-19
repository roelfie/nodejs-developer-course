const request = require('request')

const apiKey_Darksky = process.env.WEATHER_APP_DARKSKY_API_KEY
const urlDarkSky = `https://api.darksky.net/forecast/${apiKey_Darksky}/{LATITUDE},{LONGITUDE}?lang=nl&units=si`

const forecast = (longitude, latitude, callback) => {
    var url = urlDarkSky.replace('{LONGITUDE}', encodeURIComponent(longitude))
                        .replace('{LATITUDE}', encodeURIComponent(latitude))

    request({url: url, json: true, lang: 'en'}, (error, response) => {
        if (error) { // low level error
            callback("Error calling darksky: " + error)
        } else if (response.body.error) { // darksky specific error
            callback("Error calling darksky: " + response.body.error)
        } else {
            callback(undefined, {
                summary: response.body.currently.summary.toLowerCase(),
                temp: response.body.currently.temperature,
                rain: response.body.currently.precipProbability
            })
        }
    })    
}

module.exports = {
    forecast: forecast
}
