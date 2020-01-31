<template><div /></template>
<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default Vue.extend({
  name: 'FindGmrEvents',
  computed: {
    ...mapState('gmrEvents', { areGmrEventsLoading: 'isFindPending' }),
    ...mapGetters('gmrEvents', { findGmrEventsInStore: 'find' }),
    // Query for future appointments
    queryUpcoming() {
      return {
        date: { $gte: new Date().toISOString() },
        $sort: {
          date: 1
        }
      }
    },
    // Query for past appointments
    queryPast() {
      return {
        date: {
          $lt: new Date().toISOString()
        },
        $sort: {
          date: -1
        }
      }
    },
    queryNext() {
      return {
        date: {
          $gte: new Date().toISOString()
        },
        $sort: {
          date: 1
        },
        $limit: 1
      }
    },
    // The list of upcoming appointments.
    upcomingGmrEvents() {
      return this.findGmrEventsInStore({
        query: this.queryUpcoming
      }).data
    },
    // The list of past appointments
    pastGmrEvents() {
      return this.findGmrEventsInStore({
        query: this.queryPast
      }).data
    },
    nextGmrEvent() {
      return this.findGmrEventsInStore({ query: this.queryNext }).data[0]
    }
  },
  methods: {
    ...mapActions('gmrEvents', { findGmrEvents: 'find' })
  },
  created() {
    // Find all appointments. We'll use the getters to separate them.
    this.findGmrEvents({
      query: {}
    })
  }
})
</script>
