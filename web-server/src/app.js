require('dotenv').config({path: '/Users/roelfie/.config/_roelfie/nodejs-developer-course.conf'})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// External APIs
const mapbox = require('./utils/mapbox')
const darksky = require('./utils/darksky')

// Define paths for Express config
const publicFolder = path.join(__dirname, '../public')
const viewsFolder = path.join(__dirname, "../templates/views")
const partialsFolder = path.join(__dirname, "../templates/partials")

const app = express()
const port = process.env.PORT || 3000 // provided by Heroku (default 3000 if not run on Heroku)

// Setup Express view engine (handlebars) and templates directory (default is 'views').
app.set('view engine', 'hbs') 
app.set('views', viewsFolder)
hbs.registerPartials(partialsFolder)

// Setup static content directory
app.use(express.static(publicFolder))

app.get('', (req, res) => {
    // res.render('index') tells Express to automatically render templates/index.hbs
    res.render('index', {
        title: 'Weather',
        name: 'Roelfie'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roelfie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Roelfie'
    })
})

// Lookup weather for location
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({error: "Please specify a location."})
    }
    const location = req.query.location

    mapbox.geocode(location, (error, geoData) => {
        if (error) {
            return res.send({error})
        }
    
        darksky.forecast(geoData.longitude, geoData.latitude, (error, forecast) => {
            if (error) {
                return res.send({error})
            }
            res.send({ location: geoData, forecast })
        })
    })
})

// Setup 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Express server running on port ' + port)
})