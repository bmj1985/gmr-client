/* eslint-disable no-console */
const logger = require('./logger')
const app = require('./app')
const port = app.get('port')
const server = app.listen(port)

// const worker = require('./scheduled-tasks/worker')
const clock = require('./scheduled-tasks/clock')

process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
    logger.info(
        'Feathers application started on http://%s:%d',
        app.get('host'),
        port
    )
)

clock()
