import Vue from "vue"
import Router from "vue-router"
import store from "./store/store"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/signup",
      name: "SignUp",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/SignUp.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/events",
      name: "Events",
      component: () => import("./views/Events.vue")
    },
    {
      path: "/addevent",
      name: "AddEvent",
      component: () => import("./views/AddEventWithPreview.vue"),
      beforeEnter: (to, from, next) => {
        store
          .dispatch("auth/authenticate")
          .then(res => {
            const superAdmin = res.user.permissions.find(
              v => v === "super-admin"
            )
            const admin = res.user.permissions.find(v => v === "admin")
            if (superAdmin === "super-admin" || admin === "admin") {
              next()
            } else next({ path: "/" })
          })
          .catch(error => {
            if (!error.message.includes("Could not find stored JWT")) {
              console.error(error)
              next({ path: "/" })
            }
          })
      }
    },
    {
      path: "/privacypolicy",
      name: "PrivacyPolicy",
      component: () => import("./components/PrivacyPolicy.vue")
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/UserDashboard.vue")
    },
    {
      path: "/admindashboard",
      name: "AdminDashboard",
      component: () => import("./views/AdminDashboard.vue"),
      beforeEnter: (to, from, next) => {
        store
          .dispatch("auth/authenticate")
          .then(res => {
            const superAdmin = res.user.permissions.find(
              v => v === "super-admin"
            )
            const admin = res.user.permissions.find(v => v === "admin")
            if (superAdmin === "super-admin" || admin === "admin") {
              next()
            } else next({ path: "/" })
          })
          .catch(error => {
            if (!error.message.includes("Could not find stored JWT")) {
              console.error(error)
              next({ path: "/" })
            }
          })
      }
    },
    {
      path: "/shop",
      name: "Shop",
      component: () => import("./views/Shop.vue")
    },
    {
      path: "/shop/:id/",
      name: "Product",
      component: () => import("./views/Product.vue")
    }
  ]
})
