const users = require('./users/users.service.js');
const gmrEvents = require('./gmr-events/gmr-events.service.js');
const trailheads = require('./trailheads/trailheads.service.js');
const runningRoutes = require('./running-routes/running-routes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(gmrEvents);
  app.configure(trailheads);
  app.configure(runningRoutes);
};
