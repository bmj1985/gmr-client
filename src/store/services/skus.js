import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../feathers-client"

class Sku extends BaseModel {
  // constructor(data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = "Sku"
  // Define default properties here
  static instanceDefaults() {
    return {
      id: "sku_H0VSsMNnRahbYv",
      object: "sku",
      active: true,
      attributes: {
        gender: "Unisex",
        size: "One size",
        category: "hat"
      },
      created: 1585600973,
      currency: "usd",
      image:
        "https://goldenmountainrunners.s3.us-east-2.amazonaws.com/product-images/Tagert_Green-Wilson_Hut_Trip_20200309_0020_2020_04_06_12_49_12.jpg",
      inventory: {
        quantity: 30,
        type: "finite",
        value: null
      },
      livemode: false,
      metadata: {},
      package_dimensions: null,
      price: 2500,
      product: "1001",
      updated: 1586200268
    }
  }
}
const servicePath = "stripe/skus"
console.log("servicePath", servicePath)
const servicePlugin = makeServicePlugin({
  Model: Sku,
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
