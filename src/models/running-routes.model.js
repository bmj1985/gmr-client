// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const runningRoutes = new mongooseClient.Schema(
    {
      name: String,
      route: {
        type: { type: String },
        features: [
          {
            type: { type: String },
            properties: {
              name: { type: String, required: true }
            },
            geometry: {
              type: { type: String },
              coordinates: [[Number]]
            }
          }
        ]
      }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('running-routes', runningRoutes);
};
