const Queue = require('bull')

module.exports = function buildBullQueue ({ name = 'test-queue', options = {} }) {
    if (!options.redis) {
        options.redis = {
            port: 6379,
            host: '127.0.0.1'
        }
    }
    if (!options.attempts) options.attempts = 3 // attempts
    if (!options.timeout) options.timeout = 60 * 1000 // ms

    const queue = new Queue(name, options)
    const log = require('debug')('queues:' + name)

    queue.on('progress', (job, progress) => {
        log(`${name} job with id ${job.id} has progressed: ${progress}%`)
    })

    queue.on('completed', (job, result) => {
        log(`${name} job with id ${job.id} has been completed:`, result)
    })

    return queue
}
