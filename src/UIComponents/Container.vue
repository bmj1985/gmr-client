<template>
  <div class="gmrContainer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style scoped lang="scss">
.gmrContainer {
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  border-radius: 10px;
  padding: 0.75rem;
  margin: 0;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  @media only screen and (max-width: 760px) {
    height: 98%;
    width: 98%;
    border-radius: 0;
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: flex-start;
    height: 98%;
    width: 98%;
    border-radius: 0;
    overflow: scroll;
  }
}
</style>
