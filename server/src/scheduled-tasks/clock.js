const worker = require('./worker')
const CronJob = require('cron').CronJob

const job = new CronJob({
    cronTime: '40 9,11,15,20,22 * * *', // everyday, 9:13, 11:13, 4:13, 8:13,
    onTick: worker.checkFacebookEvent(),
    start: true,
    timeZone: 'America/Denver',
})

job.start()
