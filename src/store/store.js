import Vue from "vue"
import Vuex from "vuex"
import auth from "./store.auth"
import { FeathersVuex } from "./feathers-client"

Vue.use(Vuex)
Vue.use(FeathersVuex)

const requireModule = require.context(
  // The path where the service modules live
  "./services",
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

export default new Vuex.Store({
  state: {},
  getters: {
    isAdmin: state => {
      const admin =
        state.auth &&
        state.auth.user &&
        state.auth.user.permissions &&
        state.auth.user.permissions.find(v => v === "admin")
      if (admin === "admin") {
        return true
      }
      return false
    }
  },
  mutations: {},
  actions: {},
  plugins: [...servicePlugins, auth]
})
