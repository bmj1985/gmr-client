<template>
  <div class="level is-mobile">
    <b-navbar-item tag="div" v-if="!isSignUpPage">
      <router-link to="signup" class="button is-light-blue login-button"
        ><strong>Sign Up</strong>
      </router-link>
    </b-navbar-item>
    <b-navbar-item tag="div">
      <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
        <a slot="trigger" role="button">
          <router-link to="login">
            Login
          </router-link>
          <!-- <span class="button is-dark-blue login-button">Login</span> -->
        </a>
        <b-dropdown-item
          aria-role="menu-item"
          :focusable="false"
          custom
          paddingless
        >
          <form action="" class="login-form">
            <div class="modal-card login-modal">
              <section class="modal-card-header">
                <GoogleSignInButton style="width:86.6%;" />
              </section>
              <p id="or">OR</p>
              <section class="modal-card-body">
                <form
                  class="form"
                  method="post"
                  @submit.prevent="onSubmit(email, password)"
                >
                  <b-field label="Email">
                    <b-input
                      type="email"
                      placeholder="Your email"
                      required
                      class="block"
                      name="email"
                      v-model="user.email"
                    >
                    </b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      required
                      class="block"
                      name="password"
                      v-model="user.password"
                    >
                    </b-input>
                  </b-field>

                  <b-checkbox>Remember me</b-checkbox>
                </form>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-dark-blue login-button" type="submit">
                  <p>
                    Login
                  </p>
                </button>
              </footer>
            </div>
          </form>
        </b-dropdown-item>
      </b-dropdown>
    </b-navbar-item>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import GoogleSignInButton from '@/components/GoogleSignInButton'
export default Vue.extend({
  name: 'Login',
  components: { GoogleSignInButton },
  data: () => ({
    valid: false,
    user: {
      username: '',
      password: '',
      email: '',
      name: ''
    }
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    isSignUpPage() {
      return this.$route.name === 'SignUp'
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    onSubmit(email, password) {
      this.authenticate({
        strategy: 'local',
        email: email,
        password: password
      })
        .then(() => {
          console.log('is logged in')
        })
        .catch(e => {
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e)
        })
    }
  }
})
</script>

<style scoped lang="scss">
.login-button {
  min-width: 83px;
  width: 100%;
}
#or {
  padding-top: 20px;
}

.login-form {
  width: 100%;
  display: flex;
}
.login-modal {
  width: 100%;
  @media only screen and (min-width: 450px) {
    min-width: 300px;
  }
}
.modal-card-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
