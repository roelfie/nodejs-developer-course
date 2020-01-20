const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/about', (req, res) => {
    res.send('About ...')
})

app.get('/weather', (req, res) => {
    res.send('Weather ...')
})

app.listen(3000, () => {
    console.log('Express server running on port 3000.')
})