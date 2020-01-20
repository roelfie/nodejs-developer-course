// NB: Fetch API is only available in the browser (not in Node.js)!

const fetchWeather = (location, callback) => {
    fetch('/weather?location=' + location).then(callback)
}

// https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript/14825536
// ipstack.js offers a service that translates an ip address to a geo location
// but we don't need that, because the following url returns the client ip AND its location:
const fetchDefaultLocation = (callback) => {
    fetch('http://ip-api.com/json/').then(callback)
}

const form = document.querySelector('form')
const locationInput = document.querySelector('input')
const errorDiv = document.querySelector('#error')
const locationDiv = document.querySelector('#location')
const weatherDiv = document.querySelector('#weather')

const clearWeatherInfo = () => {
    errorDiv.textContent = ''
    locationDiv.textContent = ''
    weatherDiv.textContent = ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent default behavior (page refresh)
    clearWeatherInfo()
    weatherDiv.textContent = 'Loading data...'

    fetchWeather(locationInput.value, (fetchResponse) => {
        fetchResponse.json().then((data) => {
            clearWeatherInfo()
            if (data.error) {
                errorDiv.textContent = data.error
            } else {
                // console.log(data)
                const {summary, temperature, rainProbability:rain} = data.forecast
                locationDiv.textContent = `${data.location.placeName}`
                weatherDiv.textContent = `${summary}. Het is ${temperature} graden Celsius. Er is ${rain}% kans op regen.`
            }
        })
    })
})

window.onload = () => {
    fetchDefaultLocation((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.city) {
                locationInput.value = data.city
            }
        })
    })
}