// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function(app) {
    const mongooseClient = app.get('mongooseClient')
    const gmrEvents = new mongooseClient.Schema(
        {
            date: { type: Date, required: true } || null,
            details: { type: String } || null,
            trailhead:
                { name: { type: String }, address: { type: String } } || null,
            route_id: { type: String } || null,
            title: { type: String, required: true } || null,
            runRouteLink: String || null,
        },
        {
            timestamps: true,
        }
    )

    return mongooseClient.model('gmr-events', gmrEvents)
}
