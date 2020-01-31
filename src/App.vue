<template>
  <div id="app">
    <vue100vh id="vue100vh">
      <NavBar class="header" />
      <vue100vh :css="{ height: 'calc(100rvh - 6rem)' }">
        <main>
          <router-view></router-view>
        </main>
      </vue100vh>
      <footer id="footer">
        <div class="social-icons">
          <a
            href="https://www.instagram.com/goldenmountainrunners"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" id="instagram" />
          </a>
        </div>
      </footer>
    </vue100vh>
  </div>
</template>

<script>
import Vue from 'vue'
import NavBar from '@/components/NavBar'
import vue100vh from 'vue-100vh'

export default Vue.extend({
  name: 'app',
  components: { NavBar, vue100vh },
  computed: {
    // The user is automatically set by the feathers-vuex auth module upon login.
    user() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    try {
      this.$store.dispatch('auth/authenticate').catch(error => {
        if (!error.message.includes('Could not find stored JWT')) {
          console.error(error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
})
</script>

<style lang="scss">
@import './styles/_reset';
@import './styles/_global';

* {
  box-sizing: border-box;
  scrollbar-width: thin;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  overflow: hidden;

  #vue100vh {
    overflow: hidden;
  }

  .header {
    height: 3.25rem;
  }

  main {
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./assets/goldentopo.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    router-view {
      height: 100%;
      overflow: scroll;
    }
  }

  #footer {
    height: 2.75rem;
    width: 100vw;
    background: $primary-0;
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.19), 0 -6px 6px rgba(0, 0, 0, 0.23);
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .slack-invite {
      display: flex;
      align-self: flex-start;
      justify-self: flex-start;
      margin: 1rem;
    }
    .social-icons {
      height: 100%;
      width: 48px;
      padding: 0.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        i {
          margin: 1rem;
          color: $gmr-grey;
        }
      }
      #instagram {
        height: 90%;
        width: 100%;
        color: white;
        max-height: 2.25rem;
      }
    }
  }
}
</style>
