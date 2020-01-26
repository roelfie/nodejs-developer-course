// Just an example of a piece of middleware you could use for a 'site maintenance' page

const isMaintenanceMode = false

const maintenance = (req, res, next) => {
    if (isMaintenanceMode) {
        res.status(503).send('Temporarilly down...')
    } else {
        next()
    }
}

module.exports = maintenance