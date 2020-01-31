<template>
  <Container class="events-wrapper">
    <FindGmrEvents />
    <div class="events-header">
      <section>
        <b-tabs position="is-centered" class="block" v-model="activeTab">
          <b-tab-item label="Upcoming Events"></b-tab-item>
          <b-tab-item label="Past Events"></b-tab-item>
        </b-tabs>
      </section>
    </div>
    <div class="event-cards" v-if="!shouldShowCheckBackText">
      <EventCard v-for="event in events" :key="event._id" :gmrEvent="event" />
      <router-link to="/addevent" v-if="isAdmin" class="add-button-container">
        <font-awesome-icon
          :icon="['fas', 'plus-circle']"
          id="add-event-button"
        />
        <p>Add Event</p>
      </router-link>
    </div>
    <div class="check-back-later" v-if="shouldShowCheckBackText">
      {{ checkBackText }}
    </div>
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '@/UIComponents/Container'
import { models } from 'feathers-vuex'
import { mapActions, mapState, mapGetters } from 'vuex'
import { nextTuesday, formatDate } from '../utils'
import EventCard from '@/components/EventCard.vue'
import FindGmrEvents from '@/components/FindGmrEvents.vue'

export default Vue.extend({
  name: 'Events',
  components: { Container, EventCard, FindGmrEvents },
  data: () => ({
    activeTab: 0
  }),
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
    events() {
      if (this.activeTab === 0) {
        return this.upcomingGmrEvents
      } else return this.pastGmrEvents
    },
    editingEvent() {
      return this.$store.state.editingEvent
    },
    checkBackText() {
      return `Our next run will be ${formatDate(
        nextTuesday()
      )}, please check back soon for more details.`
    },
    shouldShowCheckBackText() {
      return this.events.length < 1 && this.activeTab === 0
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    ...mapActions('gmrEvents', { findGmrEvents: 'find' })
  },
  created() {
    this.$store.state.editingEvent = new models.api.GmrEvent()
    // Find all appointments. We'll use the getters to separate them.
    this.findGmrEvents({
      query: {}
    })
  }
})
</script>

<style scoped lang="scss">
.events-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .events-header {
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    h2 {
      font-size: 2rem;
      margin: 0.25rem;
      padding: 0.25rem;
    }
  }

  .event-cards {
    overflow: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
  }
  .add-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    padding: 1rem;
    height: 10rem;
    min-height: 200px;
    width: 100%;

    @media screen and (max-width: 320px) {
      max-width: 320px;
    }

    @media screen and (max-width: 450px) {
      max-width: 450px;
    }
    #add-event-button {
      height: 100px;
      width: 100px;
      margin: 1rem;
      padding: 1rem;
      margin-right: 0;
      padding-right: 0;
      p {
        font-weight: 800;
        font-size: 2rem;
      }
    }
  }
  .check-back-later {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10rem;
    height: 100%;
    width: 80%;
    font-size: 1.5rem;
  }
}
</style>
