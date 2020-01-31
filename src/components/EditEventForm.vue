<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Event</p>
      </header>
      <section class="modal-card-body">
        <fieldset class="event-fieldset">
          <b-field label="Title">
            <b-input
              placeholder="Event title"
              v-model="editingEvent.title"
            ></b-input>
          </b-field>
          <b-field label="Select day and time">
            <b-datetimepicker
              rounded
              placeholder="Click to select..."
              icon="calendar-today"
              :datepicker="{ showWeekNumber }"
              :timepicker="{ enableSeconds, hourFormat: format }"
              v-model="date"
            >
            </b-datetimepicker>
          </b-field>
          <b-field label="Trailhead" class="trailhead-wrapper">
            <div class="trailhead-content">
              <b-select
                placeholder="Select a trailhead"
                v-model="editingEvent.trailhead"
              >
                <option
                  v-for="trailhead in trailheads"
                  :value="trailhead"
                  :key="trailhead.name"
                  :selected="trailhead"
                >
                  {{ trailhead.name }}
                </option>
              </b-select>
              <button class="button">Add A Trailhead</button>
            </div>
          </b-field>
          <b-field label="Description">
            <EditTiptap class="edit-tiptap" :content="editingEvent.details" />
          </b-field>
          <b-field label="Run Route Link">
            <b-input
              placeholder="Run link"
              v-model="editingEvent.runRouteLink"
            ></b-input>
          </b-field>
        </fieldset>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" type="button" @click="$parent.close()">
          Cancel
        </button>
        <button
          class="button is-success"
          type="submit"
          @click.prevent="onSubmit()"
        >
          Edit Event
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import EditTiptap from './EditTiptap'
import { parse } from 'date-fns'
import { mapActions } from 'vuex'
export default Vue.extend({
  name: 'EditEventForm',
  components: { EditTiptap },
  props: { gmrEvent: { type: Object } },
  data: () => ({
    trailheads: [
      {
        name: 'Green Mountain/Rooney',
        address: '1000 S. Rooney Road, Lakewood, CO 80228'
      },
      {
        name: 'Mountain Toad',
        address: '900 Washington Ave, Golden, CO 80401'
      },
      {
        name: 'Matthews / Winters Park Trailhead',
        address: '1103 County Highway 93 Golden, CO 80401'
      },
      {
        name: 'Golden City Brewery',
        address: '920 12th St, Golden, CO 80401'
      }
    ],
    showWeekNumber: false,
    formatAmPm: true,
    enableSeconds: false
  }),
  created() {
    this.$store.state.editingEvent = Object.assign({}, this.gmrEvent)
  },
  computed: {
    editingEvent() {
      return this.$store.state.editingEvent
    },
    date: {
      get() {
        return parse(this.editingEvent && this.editingEvent.date)
      },
      set(newVal) {
        this.editingEvent.date = newVal
      }
    },
    format() {
      return this.formatAmPm ? '12' : '24'
    }
  },
  methods: {
    ...mapActions('gmrEvents', {
      updateEvent: 'update'
    }),
    onSubmit() {
      this.updateEvent([this.editingEvent._id, this.editingEvent])
        .then(() => {
          this.$parent.close()
          this.alertEventEdited()
          this.$store.commit('resetForm')
        })
        .catch(err => {
          throw new Error(err.message)
        })
    },
    alertEventEdited() {
      this.$buefy.dialog.alert('Event successfully edited!')
    }
  }
})
</script>
<style scoped lang="scss">
form {
  padding: 1.5rem;
}
* {
  background: white;
}
.edit-tiptap {
  min-height: 250px;
}
</style>
