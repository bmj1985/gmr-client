<template>
  <div>Yo this is a shopping cart table</div>
</template>

<script>
import Vue from "vue"
export default Vue.extend({
  name: "ShoppingCartTable",
  computed: {
    shoppingCart() {
      return this.$store.state.shoppingCart
    }
  }
})
</script>

<style></style>
