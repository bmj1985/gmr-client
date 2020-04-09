<template>
  <div class="profile">
    <p>Email: {{ email }}</p>
    <p>Name: {{ name }}</p>
    <div class="profile-container">
      Profile Picture:
      <div class="image-container">
        <img class="is128x128" :src="profilePicture" />
      </div>
    </div></div
></template>

<script>
import Vue from "vue"
import { mapState, mapGetters } from "vuex"
export default Vue.extend({
  name: "UserProfile",
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
    ...mapGetters("auth", { user: "user" }),
    email() {
      if (!this.loading) {
        return this.user.email
      }
      return ""
    },
    name() {
      if (!this.loading) {
        return this.user.name
      }
      return ""
    },
    profilePicture() {
      if (!this.loading) {
        return this.user.profilePicture
      }
      return ""
    }
  }
})
</script>

<style>
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  height: 400px;
  margin: 0;
}
.image-container {
  width: 128px;
  height: 128px;
}
.profile-container {
  flex-direction: row;
}
</style>
