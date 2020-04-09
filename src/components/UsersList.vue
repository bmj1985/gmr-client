<template>
  <FeathersVuexFind service="users" :query="{}" watch="query" v-if="isAdmin">
    <section slot-scope="{ items: users }">
      <b-table
        :data="users"
        :mobile-cards="hasMobileCards"
        v-if="!loading"
        paginated
        backend-pagination
        :total="total"
        :per-page="perPage"
        sticky-header
        :default-sort-direction="defaultSortDirection"
        default-sort="isApprovedByAdmin"
        :sortIcon="sortIcon"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="name" label="Name" searchable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="picture" label="Picture">
            <div class="profile-picture-container">
              <img class="is32x32" :src="props.row.profilePicture" />
            </div>
          </b-table-column>

          <b-table-column label="Approved" centered>
            <span
              :class="[
                props.row.isApprovedByAdmin ? 'is-success' : 'is-danger',
                'tag'
              ]"
            >
              {{ props.row.isApprovedByAdmin }}
            </span>
          </b-table-column>
          <b-table-column field="permissions" label="Roles" centered>
            <div v-for="(role, i) in props.row.permissions" :key="i">
              {{ role }}
            </div>
          </b-table-column>
          <b-table-column field="approvedBy" label="Approved By">
            {{
              props.row.adminApprovalData &&
                props.row.adminApprovalData.adminName
            }}
          </b-table-column>
          <!-- <b-table-column field="approvedOn" label="Approved On">
            {{
              props.row.adminApprovalData &&
                format(props.row.adminApprovalData.date)
            }}
          </b-table-column> -->
        </template>
      </b-table>
    </section>
  </FeathersVuexFind>
</template>

<script>
import Vue from "vue"
import { mapGetters, mapState } from "vuex"
import { format } from "date-fns"
export default Vue.extend({
  name: "UsersList",
  data() {
    return {
      hasMobileCards: true,
      total: 100,
      sortField: "approvedBy",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      page: 10,
      perPage: 10,
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1
    }
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
    ...mapGetters(["isAdmin"])
  },
  methods: {
    format(date) {
      return format(date, "MMM DD, YYYY")
    }
  }
})
</script>

<style>
.profile-picture-container {
  height: 32px;
  width: 32px;
}
</style>
