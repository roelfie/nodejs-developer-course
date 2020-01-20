/*
 * The ipstack API can translate an ip address to a location.
 * 
 * NB1: In the OSX terminal you can find out your public ip with: curl ipecho.net/plain ; echo
 * 
 * NB2: The ipstack API also offers a "Requester IP Lookup" which automatically detects the 
 * caller's ip address and returns the location for that ip address. I don't know if that is 
 * feasible from a browser (because we would have the send the api key to the browser then)???
 * 
 * NB3: Detecting the client ip address in the browser: 
 */
const request = require('request')

const DEFAULT_LOCATION = "Location"

const apiKey = process.env.WEATHER_APP_IPSTACK_API_KEY
const urlTemplate = `http://api.ipstack.com/{IP_ADDRESS}?access_key=${apiKey}&output=json`

const lookup = (ip, callback) => {
    var url = urlTemplate.replace('{IP_ADDRESS}', encodeURIComponent(ip))

    request({url, json: true, lang: 'en'}, (error, response) => {
        if (error) {
            console.log(error)
            callback(DEFAULT_LOCATION)
        } else if (response.body.success === false) {
            callback(DEFAULT_LOCATION)
        } else {
            const location = response.body.city
            callback(location ? location : DEFAULT_LOCATION)
        }
    })
}

module.exports = {
    lookup: lookup
}