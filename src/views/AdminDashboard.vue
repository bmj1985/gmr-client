<template>
  <Container class="admin-dashboard-container">
    <div class="admin-dashboard-header">
      <section>
        <b-tabs position="is-centered" class="block" v-model="activeTab">
          <b-tab-item label="Profile"></b-tab-item>
          <b-tab-item label="Manage Users"></b-tab-item>
          <b-tab-item label="Manage Events"></b-tab-item>
          <b-tab-item label="Manage Trailheads"></b-tab-item>
        </b-tabs>
      </section>
    </div>
    <UserProfile v-if="activeTab === 0" />
    <UsersList class="users-list" v-if="activeTab === 1" />
    <AddEventButton v-if="activeTab === 2" />
    <TrailheadsTable v-if="activeTab === 3" />
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '../UIComponents/Container'
import TrailheadsTable from '../components/TrailheadsTable'
import UsersList from '../components/UsersList'
import AddEventButton from '../components/AddEventButton'
import UserProfile from '../components/UserProfile'
export default Vue.extend({
  name: 'AdminDashboard',
  data: () => ({
    activeTab: 0
  }),
  components: {
    Container,
    UsersList,
    AddEventButton,
    UserProfile,
    TrailheadsTable
  }
})
</script>

<style scoped lang="scss">
.admin-dashboard-container {
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .admin-dashboard-header {
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
