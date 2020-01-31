// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const trailheads = new mongooseClient.Schema(
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      routes: [String]
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('trailheads', trailheads);
};
