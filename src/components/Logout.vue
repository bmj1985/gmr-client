<template>
  <div class="level is-mobile">
    <router-link to="profile"
      ><div class="level">
        <Avatar />
        <p class="user-name">{{ userName }}</p>
      </div></router-link
    >
    <b-navbar-item tag="div" @click="logoutRedirect()">
      <a class="button is-light">
        Log out
      </a>
    </b-navbar-item>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import Avatar from './Avatar'
export default Vue.extend({
  name: 'Logout',
  components: { Avatar },
  data: () => ({
    valid: false
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    userName() {
      let userName = this.$store.state.auth.user.name
      return userName
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutRedirect() {
      this.logout().then(() => {
        this.$router.push('/')
        this.clearAll()
      })
    },
    ...mapMutations('users', [
      'clearAll' // lets you do `this.clearAll()` inside the component
    ])
  },
  error() {
    console.log(this.error) // eslint-disable-line no-console
  }
})
</script>
<style scoped>
.user-name {
  color: white;
  margin-left: 0.5rem;
}
</style>
