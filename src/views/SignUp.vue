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
        <p class="sign-up-text">Sign Up With Email and Password</p>
        <section>
          <form
            class="form"
            method="post"
            @submit.prevent="onSubmit(email, password, name)"
          >
            <fieldset>
              <b-field
                label="Name"
                :labelPosition="labelPosition"
                :type="nameType"
                :message="nameMessage"
              >
                <b-input
                  type="text"
                  placeholder="Your name"
                  required
                  class="block"
                  name="name"
                  v-model="tempName"
                  v-on:blur="validateName"
                >
                </b-input>
              </b-field>
              <b-field
                label="Email"
                :labelPosition="labelPosition"
                :type="emailType"
                :message="emailMessage"
              >
                <b-input
                  type="email"
                  placeholder="Your email"
                  required
                  class="block"
                  name="email"
                  v-model="tempEmail"
                  v-on:blur="validateEmail"
                >
                </b-input>
              </b-field>

              <b-field
                label="Password"
                :labelPosition="labelPosition"
                :type="passwordType"
                :message="passwordMessage"
              >
                <b-input
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  required
                  class="block"
                  name="password"
                  v-model="tempPassword"
                  v-on:blur="validatePassword"
                >
                </b-input>
              </b-field>
              <b-field
                label="Confirm Password"
                :labelPosition="labelPosition"
                :message="confirmPasswordMessage"
                :type="confirmPasswordType"
              >
                <b-input
                  type="password"
                  password-reveal
                  placeholder="Confirm your password"
                  required
                  class="block"
                  name="password"
                  v-model="tempConfirmPassword"
                  v-on:blur="validateConfirmPassword"
                >
                </b-input>
              </b-field>
              <footer>
                <button class="button is-dark-blue signup-button" type="submit">
                  <p>
                    Sign Up
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
import GoogleSignInButton from '@/components/GoogleSignInButton'
import Container from '@/UIComponents/Container'
import { mapActions } from 'vuex'
import { emailIsValid, passwordIsValid } from '@/utils.js'
export default Vue.extend({
  name: 'SignUp',
  components: { GoogleSignInButton, Container },
  data: () => ({
    valid: false,
    password: '',
    tempPassword: '',
    email: '',
    tempEmail: '',
    confirmPassword: '',
    tempConfirmPassword: '',
    error: undefined,
    tempName: '',
    name: '',
    nameHadFocus: false
  }),
  computed: {
    isSignUpPage() {
      return this.$route.name === 'SignUp'
    },
    labelPosition() {
      if (window.innerWidth < 500) {
        return 'on-border'
      }
      return null
    },
    isPasswordMatch() {
      return this.password === this.confirmPassword
    },
    emailMessage() {
      if (this.email.length === 0) {
        return null
      }
      if (emailIsValid(this.email)) {
        return null
      }
      return 'Please enter a valid email.'
    },
    emailType() {
      if (this.email.length === 0) {
        return null
      }
      if (emailIsValid(this.email)) {
        return null
      }
      return 'is-danger'
    },
    passwordMessage() {
      // A valid password has at least one uppercase, one lowercase, one digit, one special charachter, and is at least 8 characters long
      if (this.password.length === 0) {
        return null
      }
      if (passwordIsValid(this.password)) {
        return null
      }
      return 'Please enter a valid password.'
    },
    passwordType() {
      if (this.password.length === 0) {
        return null
      }
      if (passwordIsValid(this.password)) {
        return null
      }
      return 'is-danger'
    },
    confirmPasswordMessage() {
      // A valid password has at least one uppercase, one lowercase, one digit, one special charachter, and is at least 8 characters long
      if (this.tempConfirmPassword === this.password) {
        return null
      }
      if (this.password.length === 0) {
        return null
      }
      if (this.confirmPassword === this.password) {
        return null
      }
      return 'Passwords do not match.'
    },
    confirmPasswordType() {
      if (this.tempConfirmPassword === this.password) {
        return null
      }
      if (this.confirmPassword.length === 0) {
        return null
      }
      if (this.confirmPassword === this.password) {
        return null
      }
      return 'is-danger'
    },
    nameType() {
      if (this.tempName.length > 3) {
        return null
      }
      if (this.name.length < 2 && this.nameHadFocus) {
        return 'is-danger'
      }
      return null
    },
    nameMessage() {
      if (this.tempName.length > 3) {
        return null
      }
      if (this.name.length < 2 && this.nameHadFocus) {
        return 'Please enter your name.'
      }
      return null
    }
  },
  methods: {
    setNameHadFocus() {
      this.nameHadFocus = true
    },
    validateName() {
      this.nameHadFocus = true
      this.name = this.tempName
    },
    validateEmail() {
      this.email = this.tempEmail
    },
    validatePassword() {
      this.password = this.tempPassword
    },
    validateConfirmPassword() {
      this.confirmPassword = this.tempConfirmPassword
    },
    dismissError() {
      this.error = undefined
      // this.clearCreateError()
    },
    onSubmit(email, password, name) {
      this.dismissError()
      // Automatically log the user in after successful signup.
      this.createUser({ email, password, name })
        .then(response => {
          this.authenticate({ strategy: 'local', email, password })
        })
        .then(res => {
          this.$router.push('/dashboard')
        })
        // Just use the returned error instead of mapping it from the store.
        .catch(error => {
          // Convert the error to a plain object and add a message.
          let type = error.errorType
          error = Object.assign({}, error)
          error.message =
            type === 'uniqueViolated'
              ? 'That email address is unavailable.'
              : 'An error prevented signup.'
          this.error = error
        })
    },
    ...mapActions('users', {
      createUser: 'create'
    }),
    ...mapActions('auth', ['authenticate'])
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
