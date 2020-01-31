import Vue from 'vue'
import Vuex from 'vuex'
import auth from './store.auth'
import { models } from 'feathers-vuex/dist'

Vue.use(Vuex)

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

console.log('servicePlugins:', servicePlugins)

export default new Vuex.Store({
  state: {
    editingEvent: null
  },
  getters: {
    isAdmin: state => {
      const admin =
        state.auth &&
        state.auth.user &&
        state.auth.user.permissions.find(v => v === 'admin')
      if (admin === 'admin') {
        return true
      }
      return false
    }
  },
  mutations: {
    updateTitle(state, title) {
      state.editingEvent.title = title
    },
    updateDate(state, date) {
      state.editingEvent.date = date
    },
    updateDetails(state, details) {
      state.editingEvent.details = details
    },
    updateRouteId(state, routeId) {
      state.editingEvent.route_id = routeId
    },
    updateRunRouteLink(state, runRouteLink) {
      state.editingEvent.runRouteLink = runRouteLink
    },
    updateTrailhead(state, trailhead) {
      state.editingEvent.trailhead = trailhead
    },
    resetForm(state) {
      state.editingEvent = new models.api.GmrEvent()
    }
  },
  actions: {},
  plugins: [...servicePlugins, auth]
})
