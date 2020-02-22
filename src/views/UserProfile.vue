<template>
  <Container>
    <p>Email: {{ email }}</p>
    <p>Name: {{ name }}</p>
    <p>Profile Picture: {{ profilePicture }}</p>
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '../UIComponents/Container'
export default Vue.extend({
  name: 'UserProfile',
  components: { Container },
  computed: {
    email() {
      return (
        this.$store &&
        this.$store.state &&
        this.$store.state.auth &&
        this.$store.state.auth.user &&
        this.$store.state.auth.user.email
      )
    },
    name() {
      return (
        this.$store &&
        this.$store.state &&
        this.$store.state.auth &&
        this.$store.state.auth.user &&
        this.$store.state.auth.user.name
      )
    },
    profilePicture() {
      return (
        this.$store &&
        this.$store.state &&
        this.$store.state.auth &&
        this.$store.state.auth.user &&
        this.$store.state.auth.user.profilePicture
      )
    }
  }
})
</script>

<style></style>
