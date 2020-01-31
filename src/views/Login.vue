<template>
  <Container>
    <div class="logo-container">
      <img
        src="../assets/gmr_logo_svg.svg"
        alt="GMR Logo"
        class="image is-square svg-logo"
      />
    </div>
    <div class="form-container">
      <div class="wrapper">
        <section>
          <GoogleSignInButton />
        </section>
        <p id="or">OR</p>
        <p class="sign-up-text">Login With Email and Password</p>
        <section>
          <form
            class="form"
            method="post"
            @submit.prevent="onSubmit(user.email, user.password)"
          >
            <fieldset>
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
              <footer>
                <button class="button is-dark-blue signup-button" type="submit">
                  <p>
                    Login
                  </p>
                </button>
              </footer>
            </fieldset>
          </form>
        </section>
      </div>
    </div>
  </Container>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import Container from '@/UIComponents/Container'
export default Vue.extend({
  name: 'Login',
  components: { GoogleSignInButton, Container },
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
          this.$router.push('Dashboard')
        })
        .catch(e => {
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e)
        })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.auth.user) {
        next(from.path)
      } else next()
    })
  }
})
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 30rem;
    object-fit: contain;
    padding: 2rem;
    max-height: 30rem;
    @media only screen and (max-width: 450px) {
      height: 15rem;
      padding: 1rem;
    }
  }
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  text-align: left;
  .wrapper {
    width: 100%;
    @media only screen and (max-width: 450px) {
      width: 80vw;
    }
  }
}

a {
  text-decoration: none;
  color: #365899;
}
#or {
  text-align: center;
  padding-top: 1rem;
}
.sign-up-text {
  text-align: center;
  padding: 1rem;
}
.signup-button {
  width: 100%;
}
footer {
  padding-top: 1rem;
}
</style>
