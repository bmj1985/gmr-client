<template>
  <div class="welcome">
    <h3>Welcome to</h3>
    <img
      class="logo is-96x96"
      alt="GMR logo"
      src="../assets/gmr_logo_svg.svg"
    />
    <p class="next-run">Our next run will be:</p>
    <h2 class="date">
      {{ date }}
    </h2>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'WelcomeToGmr',
  props: { gmrEvent: { type: Object }, date: { type: String } },
  data() {
    return {
      pendingRunDetails:
        'Details coming soon! Runs are usually posted between the Thursday and Monday prior.'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #365899;
}

.welcome {
  padding: 1rem;
  padding-bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  .next-run {
    padding: 0.5rem;
  }
  .date {
    padding: 0.5rem;
    padding-top: 0;
  }
  h2 {
    font-size: 1.5rem;
    @media only screen and (max-width: 450px) {
      font-size: 1rem;
    }
  }
  h3 {
    font-size: 1.75rem;
  }
  .logo {
    height: 10rem;
    width: 10rem;
    @media only screen and (max-width: 450px) {
      height: 7rem;
      width: 7rem;
    }
  }
}

@media only screen and (max-width: 450px) {
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  .logo {
    height: 7rem;
    width: 7rem;
  }
}
</style>
