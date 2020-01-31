<template>
  <Container>
    <div class="photo-container"></div>
    <div class="text-container">
      <WelcomeToGmr :gmrEvent="nextGmrEvent" :date="formattedDate" />
      <RunDescription :gmrEvent="nextGmrEvent" />
    </div>
  </Container>
</template>

<script>
import Vue from 'vue'
import RunDescription from '../components/RunDescription'
import WelcomeToGmr from '../components/WelcomeToGmr'
import Container from '@/UIComponents/Container'
import { mapActions, mapGetters, mapState } from 'vuex'
import { formatDate, nextTuesday } from '../utils'

export default Vue.extend({
  name: 'Home',
  components: { RunDescription, Container, WelcomeToGmr },
  computed: {
    ...mapState('gmrEvents', { areGmrEventsLoading: 'isFindPending' }),
    ...mapGetters('gmrEvents', { findGmrEventsInStore: 'find' }),
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
    nextGmrEvent() {
      return this.findGmrEventsInStore({ query: this.queryNext }).data[0]
    },
    formattedDate() {
      if (this.nextGmrEvent && this.nextGmrEvent.date) {
        return formatDate(this.nextGmrEvent.date)
      } else return formatDate(nextTuesday())
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

<style scoped lang="scss">
.photo-container {
  flex: 1;
  height: 100%;
  background-image: url('../assets/northtable.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    img {
      max-width: calc(570px - 2rem);
      max-height: calc(570px - 2rem);
    }
  }
  @media only screen and (max-width: 760px) {
    img {
      max-width: calc(730px - 2rem);
      max-height: calc(730px - 2rem);
    }
  }
}
.text-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin: 2rem;
  overflow: scroll;
}
</style>
