// Initializes the `trailheads` service on path `/trailheads`
const { Trailheads } = require('./trailheads.class');
const hooks = require('./trailheads.hooks');
const createModel = require('../../models/trailheads.model');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trailheads', new Trailheads(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trailheads');

  service.hooks(hooks);
};
