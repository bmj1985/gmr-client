<template><div /></template>
<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default Vue.extend({
  name: 'FindGmrEvents',
  computed: {
    ...mapState('gmrEvents', { areGmrEventsLoading: 'isFindPending' }),
    ...mapGetters('gmrEvents', { findGmrEventsInStore: 'find' }),
    queryUpcoming() {
      return {
        datetime: { $gte: new Date().toISOString() },
        $sort: {
          datetime: 1
        }
      }
    },
    queryPast() {
      return {
        datetime: {
          $lt: new Date().toISOString()
        },
        $sort: {
          datetime: -1
        }
      }
    },
    queryNext() {
      return {
        datetime: {
          $gte: new Date().toISOString()
        },
        $sort: {
          datetime: 1
        },
        $limit: 1
      }
    },
    upcomingGmrEvents() {
      return this.findGmrEventsInStore({
        query: this.queryUpcoming
      }).data
    },
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
    this.findGmrEvents({
      query: {}
    })
  }
})
</script>
