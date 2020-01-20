const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Define paths for Express config
const publicFolder = path.join(__dirname, '../public')
const viewsFolder = path.join(__dirname, "../templates/views")
const partialsFolder = path.join(__dirname, "../templates/partials")

const app = express()

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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
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

app.listen(3000, () => {
    console.log('Express server running on port 3000.')
})