<template>
  <div v-if="!isPendingRunEvent" class="run-description">
    <h2 v-if="gmrEvent.title" class="title">{{ gmrEvent.title }}</h2>
    <h3
      v-if="gmrEvent.trailhead && gmrEvent.trailhead.address"
      class="trailhead-address"
    >
      {{ gmrEvent.trailhead.name }}: {{ gmrEvent.trailhead.address }}
    </h3>
    <RunDetailsHTML :details="details" v-if="details" />
    <div class="route" v-if="gmrEvent.runRouteLink">
      <p>
        Link to route:
        <a :href="gmrEvent.runRouteLink" target="_blank" rel="noopener">{{
          gmrEvent.runRouteLink
        }}</a>
      </p>
    </div>
  </div>
  <div v-else :class="{ pending: isPendingRunEvent }">
    {{ pendingRunDetails }}
  </div>
</template>

<script>
import Vue from 'vue'
import { formatDate, nextTuesday } from '../utils'
import RunDetailsHTML from './RunDetailsHTML.vue'

export default Vue.extend({
  name: 'RunDescription',
  components: { RunDetailsHTML },
  props: { gmrEvent: { type: Object } },
  data() {
    return {
      pendingRunDetails:
        'Details coming soon! Runs are usually posted between the Thursday and Monday prior.'
    }
  },
  computed: {
    gmrEventDate() {
      if (this.gmrEvent.date) {
        return formatDate(this.gmrEvent.date)
      } else return formatDate(nextTuesday())
    },
    isPendingRunEvent() {
      if (
        this.gmrEvent &&
        (this.gmrEvent.details ||
          this.gmrEvent.title ||
          this.gmrEvent.runRouteLink)
      ) {
        return false
      } else return true
    },
    details() {
      if (this.gmrEvent && !this.gmrEvent.details) {
        return null
      }
      var pbr = /<p><br>/gi
      let newText = this.gmrEvent.details.replace(pbr, '<p>')
      return newText
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #365899;
}

.run-description {
  margin-top: 0.5rem;
  height: 45%;
  line-height: 1.1;
  h2 {
    font-size: 1.25rem;
    text-align: center;
    font-weight: 800;
  }
  p {
    margin-top: 0.75rem;
  }
  text-align: justify;
  font-size: 1.25rem;
  box-shadow: 0;
}
.pending {
  margin-top: 3rem;
  text-align: center;
  font-size: 1.25rem;
}
.trailhead-address {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}
.route {
  font-size: 1.25rem;
  color: black;
}
@media only screen and (max-width: 450px) {
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  .logo {
    height: 7rem;
    width: 7rem;
  }
  .run-description {
    &.pending {
      text-align: center;
    }
    text-align: left;
    font-size: 1.1rem;
    box-shadow: 0;
  }
  .route {
    font-size: 1rem;
  }
}
</style>
