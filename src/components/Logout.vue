<template>
  <div class="level is-mobile">
    <Avatar />
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
    valid: false,
    user: {
      username: '',
      password: ''
    }
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' })
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
    console.log(this.error)
  }
})
</script>
