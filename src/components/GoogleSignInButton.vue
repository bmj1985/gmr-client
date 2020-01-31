<template>
  <a :href="API_URL">
    <span class="button google-button" outlined>
      <div class="outer-container">
        <img
          src="../assets/googleassets/google-g.svg"
          class="googleg image is-24x24"
        />
        <div class="inner-container">
          <p class="button-text">
            {{ buttonText }}
          </p>
        </div>
      </div>
    </span>
  </a>
</template>

<script>
import Vue from 'vue'
import API_URL from '@/API_URL.js'
export default Vue.extend({
  name: 'GoogleSignInButton',
  data: () => ({
    API_URL: `${API_URL}/oauth/google`
  }),
  computed: {
    buttonText() {
      if (this.$route.name === 'SignUp') {
        return 'SIGN UP WITH GOOGLE'
      }
      return 'SIGN IN  WITH GOOGLE'
    }
  }
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
.google-button {
  min-height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
}
.googleg {
  padding: 0.2rem;
  align-self: flex-start;
  /* padding-right: 24px; */
}

.outer-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: center;
}
.inner-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
}
.button-text {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}
</style>
