<template>
  <div class="product-tile">
    <img
      class="primary-photo"
      :src="product.images[0]"
      @click="navigateToProduct"
    />
    <h3 @click="navigateToProduct">{{ product.name }}</h3>
    <h4 @click="navigateToProduct">{{ priceInDollars }}</h4>
    <footer class="column" v-if="isAdmin">
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'trash']"
        v-on:click.prevent="deleteProduct(product)"
      />
    </footer>
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
      if (
        this.product &&
        this.product.skus &&
        this.product.skus.data.length > 0
      ) {
        return `$${(this.product.skus.data[0].price / 100).toFixed(2)}`
      } else return "Inactive Skus"
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    ...mapActions("products", {
      removeProduct: "remove"
    }),
    ...mapActions("skus", {
      removeSku: "remove"
    }),
    async deleteProduct(product) {
      let result = await this.confirmDeleteProduct()
      if (result) {
        await this.product.skus.data.map(sku => this.removeSku(sku.id))
        this.removeProduct(product.id).catch(err => {
          throw new Error(err.message)
        })
      }
    },
    async confirmDeleteProduct() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: "Deleting product",
          message:
            "Are you sure you want to <b>delete</b> this product? This action cannot be undone, and will delete this product as well as all skus associated with it.",
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

  footer {
    display: flex;
    justify-content: flex-end;
    min-width: 100px;
    padding: 0;
  }
  footer :nth-child(2) {
    margin-left: 1rem;
  }
}
</style>
