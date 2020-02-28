<template>
  <Container class="events-wrapper">
    <div class="events-header">
      <section>
        <b-tabs position="is-centered" class="block" v-model="activeTab">
          <b-tab-item label="Upcoming Events"></b-tab-item>
          <b-tab-item label="Past Events"></b-tab-item>
        </b-tabs>
      </section>
    </div>
    <FeathersVuexFind service="gmrEvents" :query="query" watch="query">
      <section
        slot-scope="{ items: events }"
        v-if="!(events.length < 1 && activeTab === 0)"
        class="event-cards"
      >
        <EventCard v-for="event in events" :key="event.id" :gmrEvent="event" />
        <AddEventButton />
      </section>
    </FeathersVuexFind>
    <FeathersVuexFind service="gmrEvents" :query="query" watch="query">
      <section
        slot-scope="{ items: events }"
        class="check-back-later"
        v-if="events.length < 1 && activeTab === 0"
      >
        {{ checkBackText }}
      </section>
    </FeathersVuexFind>
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '@/UIComponents/Container'
import { nextTuesday, formatDate } from '../utils'
import EventCard from '@/components/EventCard.vue'
import AddEventButton from '@/components/AddEventButton.vue'
import { models } from 'feathers-vuex'

export default Vue.extend({
  name: 'Events',
  components: { Container, EventCard, AddEventButton },
  data: () => ({
    activeTab: 0
  }),
  computed: {
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
    query() {
      if (this.activeTab === 0) {
        return this.queryUpcoming
      } else return this.queryPast
    },
    editingEvent() {
      return new models.api.GmrEvent()
    },
    checkBackText() {
      return `Our next run will be ${formatDate(
        nextTuesday()
      )}, please check back soon for more details.`
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
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
