const fs = require('fs')

// Read JSON from file and convert to object
const dataBuffer = fs.readFileSync('./data.json')
const dataJson = dataBuffer.toString()
const data = JSON.parse(dataJson)

// Change object
data.name = 'Roelfie'
data.planet = 'Jupiter'
data.age = 44

// Convert object to JSON and write back to file
fs.writeFileSync('./data.json', JSON.stringify(data))
