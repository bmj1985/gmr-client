<template>
  <router-link to="/addevent" v-if="isAdmin" class="add-button-container">
    <font-awesome-icon :icon="['fas', 'plus-circle']" id="add-event-button" />
    <p>Add Event</p>
  </router-link>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"
export default Vue.extend({
  name: "AddEventButton",
  computed: {
    ...mapGetters(["isAdmin"])
  }
})
</script>

<style scoped lang="scss">
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
</style>
