<template>
  <Container class="dashboard-container">
    <div class="dashboard-header">
      <section>
        <b-tabs position="is-centered" class="block" v-model="activeTab">
          <b-tab-item label="Profile"></b-tab-item>
          <b-tab-item label="Messages"></b-tab-item>
        </b-tabs>
      </section>
    </div>
    <UserProfile />
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '../UIComponents/Container'
import UserProfile from '../components/UserProfile'
export default Vue.extend({
  name: 'Dashboard',
  components: { UserProfile, Container },
  data: () => ({
    activeTab: 0
  })
})
</script>

<style scoped lang="scss">
.dashboard-container {
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .dashboard-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .users-list {
    flex-direction: column;
    width: 100%;
  }
}
</style>
