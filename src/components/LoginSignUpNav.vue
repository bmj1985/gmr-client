<template>
  <div class="level is-mobile" v-if="!shouldHideLoginOnPublicFacingPages">
    <b-navbar-item tag="div" v-if="!isSignUpPage">
      <router-link to="/signup" class="button is-light-blue login-button"
        ><strong>Sign Up</strong>
      </router-link>
    </b-navbar-item>
    <b-navbar-item tag="div" v-if="!isLoginPage">
      <router-link to="/login" class="button is-light-blue login-button">
        Login
      </router-link>
    </b-navbar-item>
  </div>
</template>

<script>
import Vue from "vue"
export default Vue.extend({
  name: "LoginSignUpNav",
  computed: {
    isSignUpPage() {
      return this.$route.name === "SignUp"
    },
    isLoginPage() {
      return this.$route.name === "Login"
    },
    shouldHideLoginOnPublicFacingPages() {
      return false
      // return this.$route.name === "Home" || this.$route.name === "Events"
    }
  }
})
</script>

<style scoped lang="scss">
.login-button {
  min-width: 83px;
  width: 100%;
}
</style>
