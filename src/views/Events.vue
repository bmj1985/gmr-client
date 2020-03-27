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
        class="check-back-later covid19"
        v-if="events.length < 1 && activeTab === 0"
      >
        <p>
          All group runs are currently on hold due to the ongoing pandemic.
        </p>
        <p>Some things you can do in the meantime:</p>
        <ul>
          <li>
            -- Join the
            <a href="https://bit.ly/gmr-strava" target="_blank" rel="noreferrer"
              >Golden Mountain Runners Strava Club</a
            >
            and go for a run around 6:15 on Tuesday evening(s). Tag GMR in the
            title of your run.
          </li>
          <li>
            -- Tag GMR in your run photos on
            <a
              href="https://www.instagram.com/goldenmountainrunners"
              target="_blank"
              rel="noopener"
              >Instagram</a
            >
          </li>
          <li>
            -- Post photos or information on the
            <a
              href="https://www.facebook.com/groups/GoldenMountainRunners/"
              target="_blank"
              >Facebook page</a
            >
            about runs you have done. Photos, recaps, route plans, trail
            conditions, etc.
          </li>
          <li>
            -- Continue to reach out to your friends in the group via phone,
            email or text. Let's all continue to be safe, help those around us
            who are in need and try to get through this the best we can.
          </li>
        </ul>
        <p>
          Strava Group:
          <a href="https://bit.ly/gmr-strava">https://bit.ly/gmr-strava</a>
        </p>
        <!-- {{ checkBackText }} -->
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
import { subHours } from 'date-fns'

export default Vue.extend({
  name: 'Events',
  components: { Container, EventCard, AddEventButton },
  data: () => ({
    activeTab: 0
  }),
  computed: {
    queryUpcoming() {
      // Show upcoming events for two hours after they start.
      return {
        datetime: { $gte: subHours(new Date(), 2).toISOString() },
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

    @media screen and (max-width: 450px) {
      font-size: 1rem;
    }
  }
  .covid19 {
    display: flex;
    margin: 0;
    flex-direction: column;
    text-align: left;
    max-width: 700px;
    align-items: flex-start;
    overflow: scroll;
    width: 100%;
  }
}
</style>
