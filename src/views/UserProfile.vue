<template>
  <Container class="outer-container">
    <div class="container">
      <p>Email: {{ email }}</p>
      <p>Name: {{ name }}</p>
      <div class="profile-container">
        Profile Picture:
        <div class="image-container">
          <img class="is128x128" :src="profilePicture" />
        </div>
      </div>
    </div>
    <UsersList class="users-list" />
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '../UIComponents/Container'
import UsersList from '../components/UsersList'
import { mapGetters, mapState } from 'vuex'
export default Vue.extend({
  name: 'UserProfile',
  components: { Container, UsersList },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    ...mapGetters('auth', { user: 'user' }),
    email() {
      if (!this.loading) {
        return this.user.email
      }
      return ''
    },
    name() {
      if (!this.loading) {
        return this.user.name
      }
      return ''
    },
    profilePicture() {
      if (!this.loading) {
        return this.user.profilePicture
      }
      return ''
    }
  }
})
</script>

<style scoped>
.outer-container {
  align-items: flex-start;
  justify-content: flex-start;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 300px;
  height: 400px;
  margin: 0;
}
.image-container {
  width: 128px;
  height: 128px;
}
.profile-container {
  flex-direction: row;
}
.users-list {
  width: 100%;
}
</style>
