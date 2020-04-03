<template>
  <Container>
    <div v-if="loading === false">
      <p>{{ product.name }}</p>
    </div>
  </Container>
</template>

<script>
import Vue from "vue"
import Container from "@/UIComponents/Container"
import API_URL from "../API_URL"
export default Vue.extend({
  name: "Product",
  components: { Container },
  data() {
    return {
      loading: false,
      product: null,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      fetch(`${API_URL}/stripe/products/${this.$route.params.id}`)
        .then(response => response.json())
        .then(response => {
          this.product = response
          this.loading = false
        })
        .catch(error => console.error(error))
    }
  }
})
</script>

<style></style>
