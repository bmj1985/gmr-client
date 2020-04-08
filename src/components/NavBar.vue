<template>
  <b-navbar class="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <div class="logo-container">
          <img
            src="../assets/gmr_logo_svg.svg"
            alt="GMR Logo"
            class="logo image is-128x128"
          />
        </div>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-dropdown label="Menu">
        <router-link to="/events" class="navbar-item">
          Events
        </router-link>
        <router-link to="/addevent" class="navbar-item" v-if="isAdmin">
          Add Event
        </router-link>
        <router-link to="/admindashboard" class="navbar-item" v-if="isAdmin">
          Admin Dashboard
        </router-link>
        <router-link to="/shop" class="navbar-item">
          Shop
        </router-link>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Actions" v-if="isAdmin">
        <div class="navbar-item">
          <input type="checkbox" v-model="toggleAdminView" />
          Toggle Admin View
        </div>
      </b-navbar-dropdown>
    </template>
    <template slot="end">
      <div
        v-if="numberOfItemsInCart > 0"
        class="shopping-cart-icon"
        @click="navigateToCheckout"
      >
        <font-awesome-icon
          :icon="['fas', 'shopping-cart']"
          id="shopping-cart"
        />
        <p id="shopping-cart-icon-number">({{ numberOfItemsInCart }})</p>
      </div>
      <div v-if="!isUser">
        <LoginSignUpNav />
      </div>
      <div v-if="isUser">
        <b-dropdown aria-role="list" position="is-bottom-left">
          <div class="avatar">
            <Avatar />
          </div>
          <b-dropdown-item aria-role="listitem"
            ><router-link :to="`/${dashboardNavigation}`"
              ><b-navbar-item>Dashboard</b-navbar-item></router-link
            ></b-dropdown-item
          >
          <b-dropdown-item tag="div" @click="logoutRedirect()">
            <a class="button is-light">
              Log out
            </a>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </template>
  </b-navbar>
</template>

<script>
import Vue from "vue"
import LoginSignUpNav from "./LoginSignUpNav"
import Avatar from "@/components/Avatar"
import { mapActions, mapMutations, mapGetters, mapState } from "vuex"
export default Vue.extend({
  name: "NavBar",
  components: { LoginSignUpNav, Avatar },
  data: () => ({ toggleAdminView: false, valid: false }),
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapState("auth", { loading: "isAuthenticatePending" }),
    userName() {
      console.log(this.$store.getters.auth && this.$store.getters.auth.user)
      let userName = this.$store.state.auth.user.name
      return userName
    },
    dashboardNavigation() {
      if (this.isAdmin) {
        return "admindashboard"
      }
      return "dashboard"
    },
    isUser() {
      console.log(
        "isUser",
        this.$store.getters.auth && this.$store.getters.auth.user
      )
      return this.$store.getters.isUser
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    shoppingCart() {
      return this.$store.state.shoppingCart
    },
    numberOfItemsInCart() {
      return this.shoppingCart.reduce(
        (acc, currVal) => (acc += currVal.quantity),
        0
      )
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logoutRedirect() {
      this.logout().then(() => {
        this.$router.push("/")
        this.clearAll()
      })
    },
    ...mapMutations("users", [
      "clearAll" // lets you do `this.clearAll()` inside the component
    ]),
    navigateToCheckout() {
      this.$router.push("/checkout")
    }
  },
  error() {
    console.log(this.error) // eslint-disable-line no-console
  }
})
</script>

<style scoped lang="scss">
@import "../styles/_global";
.login-button {
  width: 100%;
  min-width: 83px;
}
.logo-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    height: 3rem;
    width: 3rem;
    @media only screen and (max-width: 450px) {
      height: 3rem;
      width: 3rem;
    }
  }
}
.modal-card-foot {
  flex-direction: column;
}
#google-sign-in-image {
  max-height: 3rem;
}
.navbar {
  align-items: center;
}
.shopping-cart-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90px;
  color: white;
  #shopping-cart-icon-number {
    margin-left: 0.25rem;
  }
}
.user-name {
  color: black;
  margin-left: 0.5rem;
}
.button {
  width: 100%;
}
.avatar {
  margin-right: 10px;
}
</style>
