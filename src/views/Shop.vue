<template>
  <Container class="shop-wrapper">
    <div class="shop-header">
      <section>
        <b-tabs position="is-centered" class="block" v-model="activeTab">
          <b-tab-item label="All Products"></b-tab-item>
          <b-tab-item label="Hats"></b-tab-item>
          <b-tab-item label="Men's"></b-tab-item>
          <b-tab-item label="Women's"></b-tab-item>
        </b-tabs>
      </section>
    </div>
    <div class="shop-content">
      <FeathersVuexFind service="products" :query="query" watch="query">
        <section
          slot-scope="{ items: products }"
          v-if="!(products.length < 1 && activeTab === 0)"
          class="product-cards"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product.data[0]"
          />
        </section>
      </FeathersVuexFind>
    </div>
  </Container>
</template>

<script>
import Vue from "vue"
import Container from "@/UIComponents/Container"
import ProductCard from "@/components/ProductCard"

export default Vue.extend({
  name: "Merchandise",
  components: { Container, ProductCard },
  data: () => ({
    activeTab: 0
  }),
  computed: {
    query() {
      if (this.activeTab === 0) {
        return {}
      } else if (this.activeTab === 1) {
        return {
          data: {
            category: {
              $in: "hat"
            }
          }
        }
      } else return {}
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
