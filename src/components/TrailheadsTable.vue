<template>
  <section class="container">
    <div class="search-container">
      <label>Search: &nbsp;</label><input v-model="searchTerm" />
    </div>
    <div class="column-headers">
      <div class="column"><h3>ID</h3></div>
      <div class="column"><h3>Name</h3></div>
      <div class="column"><h3>Address</h3></div>
      <div class="column" />
    </div>
    <div class="row" v-for="trailhead in trailheads" :key="trailhead.id">
      <div class="column">
        <h3>{{ trailhead.id }}</h3>
      </div>
      <div class="column">
        <h3>{{ trailhead.name }}</h3>
      </div>
      <div class="column">
        <h3>{{ trailhead.address }}</h3>
      </div>
      <div class="column">
        <font-awesome-icon
          :icon="['fas', 'edit']"
          v-on:click="editTrailheadModal(trailhead)"
        />
        <font-awesome-icon
          :icon="['fas', 'trash']"
          v-on:click="deleteTrailhead(trailhead)"
        />
      </div>
    </div>
    <AddTrailheadButton />
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions } from 'vuex'
import TrailheadEditor from './TrailheadEditor'
import AddTrailheadButton from './AddTrailheadButton'
export default Vue.extend({
  name: 'TrailheadsTable',
  components: { AddTrailheadButton },
  data: () => ({
    searchTerm: null
  }),
  computed: {
    ...mapState('trailheads', { areTrailheadsLoading: 'isFindPending' }),
    ...mapGetters('trailheads', { findTrailheadsInStore: 'find' }),
    trailheads() {
      let trailheads = this.findTrailheadsInStore({
        query: this.queryTrailheads
      }).data
      if (this.searchTerm) {
        return trailheads.filter(trailhead =>
          trailhead.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      } else return trailheads
    },
    queryTrailheads() {
      return {
        $limit: 100
      }
    }
  },
  methods: {
    ...mapActions('trailheads', { findTrailheads: 'find' }),
    cloneTrailhead(trailhead) {
      const { Trailhead } = this.$FeathersVuex.api
      return new Trailhead(trailhead).clone()
    },
    editTrailheadModal(trailhead) {
      console.log('TRAILHEAD', this.cloneTrailhead(trailhead))
      this.$buefy.modal.open({
        parent: this,
        component: TrailheadEditor,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: false,
        props: { item: this.cloneTrailhead(trailhead) }
      })
    },
    async deleteTrailhead(trailhead) {
      console.log('TRAILHEAD:', trailhead)
      let result = await this.confirmDeleteTrailhead()
      if (result) {
        trailhead.remove()
      }
    },
    async confirmDeleteTrailhead() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: 'Deleting trailhead',
          message:
            'Are you sure you want to <b>delete</b> this trailhead? This action cannot be undone.',
          confirmText: 'Delete Trailhead',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    }
  },
  created() {
    this.findTrailheads({ query: this.query })
  }
})
</script>
<style scoped lang="scss">
.container {
  width: 100%;
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.column-headers {
  padding: 0;
  margin: 0;
  list-style: none;

  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-items: stretch;
  align-items: stretch;
  text-align: left;

  .column {
    padding-bottom: 0;
    align-items: flex-end;
  }
  .column:nth-child(1) {
    flex: 0.5;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .column:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .column:nth-child(3) {
    flex: 2;
    display: flex;
    align-items: center;
  }
  .column:nth-child(4) {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.row:nth-child(even) {
  background: lightgray;
}

.row {
  padding: 0;
  margin: 0.25rem;
  list-style: none;

  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-items: stretch;
  align-items: stretch;
  border: solid 1px black;
  text-align: left;
  .column:nth-child(1) {
    flex: 0.5;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .column:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .column:nth-child(3) {
    flex: 2;
    display: flex;
    align-items: center;
  }
  .column:nth-child(4) {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
