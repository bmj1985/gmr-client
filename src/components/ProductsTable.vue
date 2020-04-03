<template>
  <section class="container">
    <div class="search-container">
      <label>Search: &nbsp;</label><input v-model="searchTerm" />
    </div>
    <div class="column-headers">
      <div class="column"><h3>ID</h3></div>
      <div class="column"><h3>Name</h3></div>
      <div class="column"><h3>Address</h3></div>
      <div class="column" />
    </div>
    <div class="row" v-for="product in products" :key="product.id">
      <div class="column">
        <h3>{{ product.id }}</h3>
      </div>
      <div class="column">
        <h3>{{ product.name }}</h3>
      </div>
      <div class="column">
        <h3>{{ product.address }}</h3>
      </div>
      <div class="column">
        <font-awesome-icon
          :icon="['fas', 'edit']"
          v-on:click="editProductModal(product)"
        />
        <font-awesome-icon
          :icon="['fas', 'trash']"
          v-on:click="deleteProduct(product)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue"
import { mapGetters, mapState, mapActions } from "vuex"
import ProductEditor from "./ProductEditor"
export default Vue.extend({
  name: "ProductsTable",
  data: () => ({
    searchTerm: null
  }),
  computed: {
    ...mapState("products", { areProductsLoading: "isFindPending" }),
    ...mapGetters("products", { findProductsInStore: "find" }),
    products() {
      let products = this.findProductsInStore({
        query: this.queryProducts
      }).data
      if (this.searchTerm) {
        return products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      } else return products
    },
    queryProducts() {
      return {
        $limit: 100
      }
    }
  },
  methods: {
    ...mapActions("products", { findProducts: "find" }),
    cloneProduct(product) {
      const { Product } = this.$FeathersVuex.api
      return new Product(product).clone()
    },
    editProductModal(product) {
      console.log("TRAILHEAD", this.cloneProduct(product))
      this.$buefy.modal.open({
        parent: this,
        component: ProductEditor,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: false,
        props: { item: this.cloneProduct(product) }
      })
    },
    async deleteProduct(product) {
      console.log("TRAILHEAD:", product)
      let result = await this.confirmDeleteProduct()
      if (result) {
        product.remove()
      }
    },
    async confirmDeleteProduct() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: "Deleting product",
          message:
            "Are you sure you want to <b>delete</b> this product? This action cannot be undone.",
          confirmText: "Delete Product",
          type: "is-danger",
          hasIcon: true,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    }
  },
  created() {
    this.findProducts({ query: this.query })
  }
})
</script>
<style scoped lang="scss">
.container {
  width: 100%;
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.column-headers {
  padding: 0;
  margin: 0;
  list-style: none;

  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-items: stretch;
  align-items: stretch;
  text-align: left;

  .column {
    padding-bottom: 0;
    align-items: flex-end;
  }
  .column:nth-child(1) {
    flex: 0.5;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .column:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .column:nth-child(3) {
    flex: 2;
    display: flex;
    align-items: center;
  }
  .column:nth-child(4) {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.row:nth-child(even) {
  background: lightgray;
}

.row {
  padding: 0;
  margin: 0.25rem;
  list-style: none;

  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-items: stretch;
  align-items: stretch;
  border: solid 1px black;
  text-align: left;
  .column:nth-child(1) {
    flex: 0.5;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .column:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .column:nth-child(3) {
    flex: 2;
    display: flex;
    align-items: center;
  }
  .column:nth-child(4) {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
