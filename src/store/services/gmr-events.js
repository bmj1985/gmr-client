import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../feathers-client'
import { nextTuesday } from '../../utils'

class GmrEvent extends BaseModel {
  // constructor(data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'GmrEvent'
  // Define default properties here
  static instanceDefaults() {
    return {
      datetime: nextTuesday(),
      details: null,
      trailhead: {
        name: null,
        address: null
      },
      trailheadId: null,
      trailheadName: null,
      routeId: null,
      runRouteLink: null,
      title: null
    }
  }

  static setupInstance(data, { store, models }) {
    data.trailhead = new models.api.Trailhead(data.trailhead)
    return data
  }
}
const servicePath = 'gmr-events'
const servicePlugin = makeServicePlugin({
  namespace: 'gmrEvents',
  Model: GmrEvent,
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
