// NB: Fetch API is only available in the browser (not in Node.js)!

const fetchWeather = (location, callback) => {
    fetch('/weather?location=' + location).then(callback)
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

    data = fetchWeather(locationInput.value, (fetchResponse) => {
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