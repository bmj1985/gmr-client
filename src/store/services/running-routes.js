import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../feathers-client'

class RunningRoute extends BaseModel {
  // constructor(data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'RunningRoute'
  // Define default properties here
  static instanceDefaults() {
    return {
      name: '',
      address: ''
    }
  }
}
const servicePath = 'running-routes'
const servicePlugin = makeServicePlugin({
  Model: RunningRoute,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
