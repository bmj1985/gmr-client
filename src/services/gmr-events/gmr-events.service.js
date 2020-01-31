// Initializes the `gmr-events` service on path `/gmr-events`
const { GmrEvents } = require('./gmr-events.class');
const hooks = require('./gmr-events.hooks');
const createModel = require('../../models/gmr-events.model');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/gmr-events', new GmrEvents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gmr-events');

  service.hooks(hooks);
};
