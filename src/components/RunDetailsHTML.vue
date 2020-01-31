<template>
  <span class="rawHtml" v-html="details"></span>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'RunDetailsHTML',
  props: ['details']
})
</script>

<style lang="scss">
@import '../styles/_global';

.rawHtml {
  width: calc(100% - 17px);
  font-size: 1.25rem;
  font-family: inherit;
  line-height: 1.2;
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-wrap: break-word;
}

.rawHtml * {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>
