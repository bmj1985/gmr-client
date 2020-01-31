<template>
  <figure class="image is-48x48">
    <img class="is-rounded" :src="profilePicture" style="padding:0.1rem;" />
  </figure>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'Avatar',
  data: () => ({
    defaultProfilePicture: require('@/assets/defaultProfilePic.png')
  }),
  computed: {
    profilePicture() {
      return this.$store.state.auth.user.profilePicture
        ? this.$store.state.auth.user.profilePicture
        : this.defaultProfilePicture
    }
  }
})
</script>
