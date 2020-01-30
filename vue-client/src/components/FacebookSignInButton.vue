<template>
  <a :href="API_URL">
    <span class="button facebook-button" outlined>
      <div class="outer-container">
        <img
          src="../assets/facebookassets/white/PNG/f_logo_RGB-White_1024.png"
          class="facebookf image is-24x24"
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
  name: 'FacebookSignInButton',
  data: () => ({
    API_URL: `${API_URL}/oauth/facebook`
  }),
  computed: {
    buttonText() {
      if (this.$route.name === 'SignUp') {
        return 'CONTINUE WITH FACEBOOK'
      }
      return 'LOGIN WITH FACEBOOK'
    }
  }
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
.facebook-button {
  min-height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  background: #4267b2;
  color: white;
  margin-top: 1rem;
}
.facebookf {
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
  color: white;
}
</style>
