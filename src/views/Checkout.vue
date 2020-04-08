<template>
  <Container><div>Checkout Page</div></Container>
</template>

<script>
import Vue from "vue"
import Container from "@/UIComponents/Container"
export default Vue.extend({
  name: "Checkout",
  components: { Container },
  data: () => ({
    someData: null
  })
})
</script>

<style></style>
