const app = require('../app.js')

module.exports = {
    checkFacebookEvent: function() {
        console.time('check Facebook Api call start')
        console.log('checking facebook event')
        console.log(app.get('gmr-events'))
        console.timeEnd('check Facebook Api call end')
    },
}
