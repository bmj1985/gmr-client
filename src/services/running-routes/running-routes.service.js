// Initializes the `running-routes` service on path `/running-routes`
const { RunningRoutes } = require('./running-routes.class');
const hooks = require('./running-routes.hooks');
const createModel = require('../../models/running-routes.model');

module.exports = function(app) {
  const Model = createModel(app);

  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/running-routes', new RunningRoutes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('running-routes');

  service.hooks(hooks);
};
