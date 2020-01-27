const dateFns = require('date-fns')
const worker = require('./worker')
const CronJob = require('cron').CronJob

const job = new CronJob({
    cronTime: '13 9,11,16,20,22 * * *', // everyday, 9:13, 11:13, 4:13, 8:13,
    onTick: worker.checkFacebookEvent(),
    start: true,
    timeZone: 'America/Los_Angeles',
})

job.start()

function nextTuesday() {
    const oneWeekFromToday = dateFns.addDays(new Date(), 7)
    const daysArr = dateFns.eachDay(new Date(), oneWeekFromToday)
    const tuesday = daysArr.find(v => dateFns.isTuesday(v))
    const tuesdayAtSix = dateFns.addHours(tuesday, 18)
    const tuesdayAtSixFifteen = dateFns.addMinutes(tuesdayAtSix, 15)
    console.log('nextTuesday', tuesdayAtSixFifteen)
    return tuesdayAtSixFifteen
}
nextTuesday()

function scheduleFacebookAPICall() {
    console.time('schedule Facebook Api call start')

    console.timeEnd('schedule Facebook Api call end')
}

// //OnInterval
// const threeSecondInterval = () => {
//     console.log('Another 3 seconds have gone by. What did you do in them?')
// }
// setInterval(threeSecondInterval, 3000)

// //For specific times, use a chron job
// var fifteenSeconsAfterMinute = function() {
//     console.log(
//         'Another minute is gone forever. Hopefully, you made the most of it...'
//     )
// }
// var CronJob = require('cron').CronJob
// new CronJob({
//     cronTime: '15 * * * * *', //15 seconds after every minute
//     onTick: fifteenSeconsAfterMinute,
//     start: true,
//     timeZone: 'America/Los_Angeles',
// })

scheduleFacebookAPICall()
