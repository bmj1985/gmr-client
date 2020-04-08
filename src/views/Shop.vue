<template>
  <Container class="shop-wrapper">
    <div class="shop-header">
      <section>
        <b-tabs position="is-centered" class="block" v-model="activeTab">
          <b-tab-item label="All Products"></b-tab-item>
          <b-tab-item label="Hats"></b-tab-item>
          <b-tab-item label="Men's"></b-tab-item>
          <b-tab-item label="Women's"></b-tab-item>
          <b-tab-item label="Active Products" v-if="isAdmin"></b-tab-item>
          <b-tab-item label="Inactive Products" v-if="isAdmin"></b-tab-item>
        </b-tabs>
      </section>
    </div>
    <div class="shop-content">
      <section class="product-cards" v-if="displayProducts.length > 0">
        <ProductCard
          v-for="displayProduct in displayProducts"
          :key="displayProduct.id"
          :product="displayProduct"
        />
        <AddItemButton itemName="Product" v-if="isAdmin" />
      </section>
    </div>
  </Container>
</template>

<script>
import Vue from "vue"
import Container from "@/UIComponents/Container"
import ProductCard from "@/components/ProductCard"
import AddItemButton from "@/components/AddItemButton"
// import API_URL from "../API_URL"
import { mapState, mapGetters, mapActions } from "vuex"

export default Vue.extend({
  name: "Shop",
  components: { Container, ProductCard, AddItemButton },
  data() {
    return {
      activeTab: 0,
      loading: false,
      error: null
    }
  },
  created() {
    this.findProducts({ query: {} })
    this.findSkus({ query: {} })
  },
  // watch: {
  //   // call again the method if the route changes
  //   $route: "fetchData"
  // },
  methods: {
    ...mapActions("products", { findProducts: "find" }),
    ...mapActions("skus", { findSkus: "find" })
  },
  computed: {
    ...mapState("products", { areProductsLoading: "isFindPending" }),
    ...mapGetters("products", { findProductsInStore: "find" }),
    ...mapState("skus", { areSkusLoading: "isFindPending" }),
    ...mapGetters("skus", { findSkusInStore: "find" }),
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    products() {
      return this.findProductsInStore({ query: {} }).data
    },
    skus() {
      return this.findSkusInStore({ query: {} }).data
    },
    displayProducts() {
      switch (this.activeTab) {
        case 0:
          return this.products
        case 1:
          return this.hats
        case 2:
          return this.mens
        case 3:
          return this.womens
        case 4:
          return this.activeProducts
        case 5:
          return this.inactiveProducts
        default:
          return this.products
      }
    },
    activeProducts() {
      return this.products.filter(product => product.active === true)
    },
    inactiveProducts() {
      return this.products.filter(product => product.active === false)
    },
    hats() {
      return this.products.filter(
        product =>
          product.skus.data.filter(sku =>
            sku.attributes.category.includes("hat")
          ).length > 0
      )
    },
    mens() {
      return this.products.filter(
        product =>
          product.skus.data.filter(
            sku => sku.attributes.gender.toLowerCase() === "men's"
          ).length > 0
      )
    },
    womens() {
      return this.products.filter(
        product =>
          product.skus.data.filter(
            sku => sku.attributes.gender.toLowerCase() === "women's"
          ).length > 0
      )
    }
  }
})
</script>

<style scoped lang="scss">
.shop-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  .shop-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .shop-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .product-cards {
    overflow: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
  }
}
</style>
