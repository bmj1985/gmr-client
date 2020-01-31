const axios = require('axios').default
const {
    addDays,
    eachDayOfInterval,
    isTuesday,
    addHours,
    addMinutes,
    format,
} = require('date-fns')
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz')

function nextTuesday() {
    const oneWeekFromToday = addDays(new Date(), 7)
    const daysArr = eachDayOfInterval({
        start: new Date(),
        end: oneWeekFromToday,
    })
    const tuesday = daysArr.find(v => isTuesday(v))
    const tuesdayAtSix = addHours(tuesday, 18)
    const tuesdayAtSixFifteen = addMinutes(tuesdayAtSix, 15)
    return tuesdayAtSixFifteen
}

function checkFacebookEventApi() {
    console.log('Pretending to check facebook api')
}

axios
    .get('https://gmrapi.herokuapp.com/gmr-events')
    .then(response => {
        console.time('start')
        const events = response.data.data
        const utcDate = zonedTimeToUtc(nextTuesday(), 'America/Denver')
        const isNextTuesdayEvent =
            events.filter(event => event.date === utcDate.toISOString())
                .length > 0

        if (isNextTuesdayEvent) {
            console.log('Event is already posted')
            return
        } else {
            checkFacebookEventApi()
        }
    })
    .catch(error => {
        console.log(error)
    })
    .then(() => {
        console.timeEnd('start')
    })
