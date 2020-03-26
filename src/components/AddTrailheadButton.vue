<template>
  <button class="button" type="button" @click="addTrailheadModal()">
    Add Trailhead
  </button>
</template>
<script>
import Vue from 'vue'
import TrailheadEditor from './TrailheadEditor'
export default Vue.extend({
  name: 'AddTrailheadButton',
  computed: {
    clonedTrailhead() {
      const { Trailhead } = this.$FeathersVuex.api
      return new Trailhead().clone()
    }
  },
  methods: {
    addTrailheadModal() {
      this.$buefy.modal.open({
        parent: this,
        component: TrailheadEditor,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: this.isModalFullscreen,
        props: { item: this.clonedTrailhead }
      })
    }
  }
})
</script>

<style></style>
