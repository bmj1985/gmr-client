<template>
  <Container>
    <div v-if="loading === false" class="product-wrapper">
      <div class="product-images">
        <img class="photo" :src="product.images[0]" />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ priceInDollars }}</p>
        <div class="select-size">
          <label>Select a size</label>
          <div class="sizes">
            <div class="size" v-for="sku in skus" :key="sku.id">
              <b-tooltip
                position="is-bottom"
                type="is-dark"
                :label="tooltipLabel(sku)"
              >
                <button
                  class="button"
                  :class="{
                    selected: isSelected(sku.id)
                  }"
                  :disabled="isDisabled(sku)"
                  @click="setSelectedSku(sku)"
                >
                  {{ sku.attributes.size }}
                </button>
              </b-tooltip>
            </div>
          </div>
        </div>
        <div v-if="itemIsSoldOut"><p>Item Is Sold Out</p></div>
        <button v-else class="button add-to-cart" @click="addItemToCart">
          {{ addToCartText }}
        </button>
      </div>
    </div>
  </Container>
</template>

<script>
import Vue from "vue"
import Container from "@/UIComponents/Container"
import { mapActions, mapState, mapGetters } from "vuex"
import { priceInDollars } from "../utils"
export default Vue.extend({
  name: "Product",
  components: { Container },
  data() {
    return {
      loading: false,
      error: null,
      selectedSku: null
    }
  },
  created() {
    this.fetchData()
    this.findProducts({ query: {} })
    this.findSkus({ query: {} })
  },
  computed: {
    ...mapState("products", { areProductsLoading: "isFindPending" }),
    ...mapGetters("products", { findProductsInStore: "find" }),
    ...mapState("skus", { areSkusLoading: "isFindPending" }),
    ...mapGetters("skus", { findSkusInStore: "find" }),
    product() {
      return this.findProductsInStore({ query: this.queryProduct }).data[0]
    },
    shoppingCart() {
      return this.$store.state.shoppingCart
    },
    skus() {
      return this.findSkusInStore({ query: this.querySkus }).data
    },
    queryProduct() {
      return {
        id: this.$route.params.id
      }
    },
    querySkus() {
      return { product: this.$route.params.id }
    },
    priceInDollars() {
      if (this.selectedSku) {
        return priceInDollars(this.selectedSku.price)
      } else return priceInDollars(this.skus[0].price)
    },
    itemIsSoldOut() {
      return (
        this.skus
          .map(sku => sku.inventory.quantity)
          .reduce((acc, currVal) => acc + currVal, 0) < 1
      )
    },
    numberOfItemsInCart() {
      return this.shoppingCart.reduce(
        (acc, currVal) => (acc += currVal.quantity),
        0
      )
    },
    addToCartText() {
      if (this.shoppingCart.length > 0) {
        return `Add To Cart (${this.numberOfItemsInCart})`
      } else return "Add To Cart"
    },
    currentInventory() {
      return this.selectedSku.inventory.quantity
    },
    shoppingCartSet() {
      return new Set(this.shoppingCart)
    },
    shoppingCartTable() {
      const tableRows = this.shoppingCart.map(
        orderItem =>
          `<tr><td>${
            orderItem.description
          }&nbsp;</td><td style="text-align:right;">${
            orderItem.quantity
          }&nbsp;</td><td>${priceInDollars(
            orderItem.amount * orderItem.quantity
          )}</td></tr>`
      )
      return `<div><table style="text-align:left;"><tr><th>Item&nbsp;</th><th>Quantity&nbsp;</th><th>Cost</th></tr>${tableRows}</table><div>`
    },
    orderItem() {
      return {
        object: "order_item",
        amount: this.selectedSku.price,
        currency: "usd",
        description: this.product.name,
        parent: this.selectedSku.id,
        quantity: 1,
        type: "sku"
      }
    },
    itemInCart() {
      return this.shoppingCart.filter(
        orderItem => orderItem.parent === this.orderItem.parent
      )[0]
    }
  },
  methods: {
    ...mapActions("products", { findProducts: "find" }),
    ...mapActions("skus", { findSkus: "find" }),
    fetchData() {
      this.loading = this.areProductsLoading
      this.findSkus({ query: {} })
      this.findProducts({ query: {} })
    },
    setSelectedSku(sku) {
      this.selectedSku = sku.clone()
    },
    isSelected(skuId) {
      return skuId === (this.selectedSku && this.selectedSku.id)
    },
    isDisabled(sku) {
      return sku.inventory.quantity < 1
    },
    tooltipLabel(sku) {
      if (this.isDisabled(sku)) {
        return "Sold Out"
      }
      return ""
    },
    cloneOrderItem(orderItem) {
      const clone = Object.assign(orderItem, {})
      return clone
    },
    addItemToCart() {
      console.log("RUNNNING ADD ITEM TO CART")
      if (this.shoppingCart.length === 25) {
        this.alertTwentyFiveItemLimit()
        return
      }
      if (this.currentInventory <= 0) {
        this.alertExceededInventory()
        return
      }
      if (this.orderItem) {
        const clone = this.cloneOrderItem(this.orderItem)
        console.log("ITEM IN CART", this.itemInCart)
        if (this.itemInCart) {
          this.itemInCart.quantity += 1
          this.selectedSku.inventory.quantity--
        } else {
          this.shoppingCart.push(clone)
          this.selectedSku.inventory.quantity--
        }
        this.alertCheckout()
      }
    },
    alertExceededInventory() {
      this.$buefy.dialog.alert("No more items available.")
    },
    async alertTwentyFiveItemLimit() {
      // Stripe Orders API limits orders to 25 items.
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: "25 Item Limit",
          message:
            "Orders are currently limited to 25 items by the Stripe Orders API. Would you like to checkout?",
          confirmText: "Checkout",
          type: "is-primary",
          hasIcon: false,
          onConfirm: () => this.$router.push("/checkout"),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    },
    async alertCheckout() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: "Shopping Cart",
          message: this.shoppingCartTable,
          confirmText: "Checkout",
          cancelText: "Keep shopping",
          type: "is-primary",
          hasIcon: false,
          onConfirm: () => this.$router.push("/checkout"),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    }
  }
})
</script>

<style scoped lang="scss">
.product-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  h1 {
    text-align: left;
    font-weight: 700;
    font-size: 2rem;
  }

  .product-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    padding-top: 10rem;
    padding-bottom: 10rem;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    min-height: 300px;
    width: 100%;
    font-size: 1.5rem;

    @media screen and (max-width: 450px) {
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin: 0;
      text-align: left;
    }

    .select-size {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: 1rem;
      margin-bottom: 1rem;
      .sizes {
        display: flex;
        flex-direction: row;

        .size {
          margin-right: 0.5rem;
        }
        .selected {
          background: lightgrey;
        }
      }
    }

    .price {
      margin-bottom: 1rem;
      @media screen and (max-width: 450px) {
        width: 100%;
      }
    }
    .add-to-cart {
      margin-bottom: 1rem;
      min-width: 200px;
      width: 50%;
      @media screen and (max-width: 450px) {
        width: 100%;
      }
    }

    @media screen and (max-width: 450px) {
      order: 3;
    }
  }
  .product-images {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* margin: 1rem;
    padding: 1rem; */

    .photo {
      /* transform: rotate(90deg); */
      border-radius: 10px;
      width: 100%;
      /* object-fit: contain; */
    }
  }
}
</style>
