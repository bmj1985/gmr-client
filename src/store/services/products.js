import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../feathers-client"

class Product extends BaseModel {
  // constructor(data, options) {
  //   super(data, options)
  // }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = "Product"
  // Define default properties here
  static instanceDefaults() {
    return {
      object: "list",
      data: [
        {
          id: "1001",
          object: "product",
          active: true,
          attributes: ["gender", "size"],
          caption: "The tech hat you've all been waiting for.",
          created: 1585600920,
          deactivate_on: [],
          description: "A short description.",
          images: [
            "https://via.placeholder.com/300x300.png?text=GMR+Tech+Hat+2020"
          ],
          livemode: false,
          metadata: {},
          name: "GMR Technical Hat 2020",
          package_dimensions: null,
          shippable: false,
          skus: {
            object: "list",
            data: [
              {
                id: "sku_H0VSsMNnRahbYv",
                object: "sku",
                active: true,
                attributes: {
                  gender: "Unisex",
                  size: "One size"
                },
                created: 1585600973,
                currency: "usd",
                image: null,
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
                updated: 1585601060
              }
            ],
            has_more: false,
            total_count: 1,
            url: "/v1/skus?product=1001&active=true"
          },
          type: "good",
          updated: 1585602016,
          url: ""
        }
      ],
      has_more: false,
      url: "/v1/products"
    }
  }
}
const servicePath = "stripe/products"
console.log("servicePath", servicePath)
const servicePlugin = makeServicePlugin({
  Model: Product,
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
