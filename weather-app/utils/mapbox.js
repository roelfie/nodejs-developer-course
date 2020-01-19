const request = require('request')

const apiKey_Mapbox = process.env.WEATHER_APP_MAPBOX_API_KEY
const urlMapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/{PLACE}.json?access_token=${apiKey_Mapbox}&limit=1`

const geocode = (place, callback) => {
    var url = urlMapbox.replace('{PLACE}', encodeURIComponent(place))

    request({url: url, json: true, lang: 'en'}, (error, response) => {
        if (error) { // low level error
            callback("Error calling mapbox: " + error)
        } else if (response.statusCode !== 200) { // mapbox specific error
            callback("Error calling mapbox: " + response.statusCode + " " + response.body.message)
        } else if (response.body.features.length === 0) { // mapbox specific error
            callback("Error calling mapbox: No place found with name " + place)
        } else {
            var result = response.body.features[0]
            callback(undefined, {
                placeName: result.place_name,
                longitude: result.center[0],
                latitude: result.center[1]
            })
        }
    })
}

module.exports = {
    geocode: geocode
}