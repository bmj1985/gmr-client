<template>
  <Container>
    <AddEvent />
    <div class="text-container" v-if="windowWidth > 450">
      <WelcomeToGmr
        :gmrEvent="editingEvent"
        :date="formattedDate"
        class="welcome-to-gmr"
      />
      <RunDescription class="run-description" :gmrEvent="editingEvent" />
    </div>
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '@/UIComponents/Container'
import AddEvent from '@/components/AddEvent'
import WelcomeToGmr from '@/components/WelcomeToGmr'
import RunDescription from '@/components/RunDescription'
import { models } from 'feathers-vuex'
import { formatDate } from '../utils'
export default Vue.extend({
  name: 'AddEventWithPreview',
  components: { Container, AddEvent, RunDescription, WelcomeToGmr },
  created() {
    if (!this.$store.state.editingEvent) {
      this.$store.state.editingEvent = new models.api.GmrEvent()
    }
  },
  computed: {
    editingEvent() {
      return this.$store.state.editingEvent
    },
    formattedDate() {
      return formatDate(this.editingEvent.date)
    },
    windowWidth() {
      return window.innerWidth
    }
  }
})
</script>
<style scoped lang="scss">
.text-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin: 2rem;
  overflow: scroll;

  .run-description {
    flex: 1;
  }
  .welcome-to-gmr {
    flex: 1;
  }
}
</style>
