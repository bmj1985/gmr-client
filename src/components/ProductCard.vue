<template>
  <div class="product-tile" @click="navigateToProduct">
    <img class="primary-photo" :src="product.images[0]" />
    <h3>{{ product.name }}</h3>
    <h4>{{ priceInDollars }}</h4>
  </div>
</template>

<script>
import Vue from "vue"
import { mapActions } from "vuex"

export default Vue.extend({
  name: "ProductCard",
  props: { product: { type: Object } },
  computed: {
    priceInDollars() {
      return `$${(this.product.skus.data[0].price / 100).toFixed(2)}`
    }
  },
  methods: {
    ...mapActions("products", {
      removeProduct: "remove"
    }),
    async deleteProduct(product) {
      let result = await this.confirmDeleteProduct()
      if (result) {
        this.removeProduct(product.id).catch(err => {
          throw new Error(err.message)
        })
      }
    },
    async confirmDeleteProduct() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: "Deleting event",
          message:
            "Are you sure you want to <b>delete</b> this event? This action cannot be undone.",
          confirmText: "Delete Product",
          type: "is-danger",
          hasIcon: true,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    },
    navigateToProduct() {
      this.$router.push({
        path: `shop/${this.product.id}`
      })
    }
  }
})
</script>

<style scoped lang="scss">
.product-tile {
  border-radius: 10px;
  max-width: 400px;
  padding: 1rem;
  &:hover {
    background-color: hsla(0, 0%, 0%, 0.05);
  }

  h3 {
    font-weight: 700;
  }
  .primary-photo {
    border-radius: 10px;
  }
}
</style>
