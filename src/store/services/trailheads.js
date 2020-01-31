import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../feathers-client'

class Trailhead extends BaseModel {
  // constructor(data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Trailhead'
  // Define default properties here
  static instanceDefaults() {
    return {
      name: '',
      address: ''
    }
  }
}
const servicePath = 'trailheads'
const servicePlugin = makeServicePlugin({
  Model: Trailhead,
  service: feathersClient.service(servicePath),
  servicePath,
  name: 'trailheads'
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
