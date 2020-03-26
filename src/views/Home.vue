<template>
  <Container>
    <div class="photo-container"></div>
    <div class="text-container">
      <WelcomeToGmr :gmrEvent="nextGmrEvent" :date="formattedDate" />
      <COVID19 />
      <!-- <RunDescription :gmrEvent="nextGmrEvent" /> -->
    </div>
  </Container>
</template>

<script>
import Vue from 'vue'
// import RunDescription from '../components/RunDescription'
import COVID19 from '../components/COVID19'
import WelcomeToGmr from '../components/WelcomeToGmr'
import Container from '@/UIComponents/Container'
import { mapActions, mapGetters, mapState } from 'vuex'
import { formatDate, nextTuesday } from '../utils'

export default Vue.extend({
  name: 'Home',
  components: { COVID19, Container, WelcomeToGmr },
  computed: {
    ...mapState('gmrEvents', { areGmrEventsLoading: 'isFindPending' }),
    ...mapGetters('gmrEvents', { findGmrEventsInStore: 'find' }),
    queryNext() {
      return {
        datetime: {
          $gte: nextTuesday().toISOString()
        },
        $sort: {
          datetime: 1
        },
        $limit: 1
      }
    },
    nextGmrEvent() {
      return this.findGmrEventsInStore({ query: this.queryNext }).data[0]
    },
    formattedDate() {
      if (this.nextGmrEvent && this.nextGmrEvent.datetime) {
        return formatDate(this.nextGmrEvent.datetime)
      } else return formatDate(nextTuesday())
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
