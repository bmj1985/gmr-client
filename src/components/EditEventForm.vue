<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Event</p>
      </header>
      <section class="modal-card-body">
        <fieldset class="event-fieldset">
          <b-field label="Title">
            <b-input placeholder="Event title" v-model="clone.title"></b-input>
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
            <FeathersVuexFind service="trailheads" :query="{}" watch="query">
              <section slot-scope="{ items: trailheads }">
                <div class="trailhead-content">
                  <b-select
                    placeholder="Select a trailhead"
                    v-model="clone.trailheadId"
                  >
                    <option
                      v-for="trailhead in trailheads"
                      :value="trailhead.id"
                      :key="trailhead.name"
                      :selected="trailhead"
                    >
                      {{ trailhead.name }}
                    </option>
                  </b-select>
                  <button class="button">Add A Trailhead</button>
                </div>
              </section>
            </FeathersVuexFind>
          </b-field>
          <b-field label="Description">
            <EditTiptap
              class="edit-tiptap"
              :content="clone.details"
              v-on:setDetails="clone.details = $event"
            />
          </b-field>
          <b-field label="Run Route Link">
            <b-input
              placeholder="Run link"
              v-model="clone.runRouteLink"
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
        <button class="button" type="button" @click.prevent="clone.reset()">
          Reset
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
    showWeekNumber: false,
    formatAmPm: true,
    enableSeconds: false,
    clone: null
  }),
  created() {
    this.clone = this.gmrEvent.clone()
  },
  computed: {
    date: {
      get() {
        return parse(this.clone && this.clone.datetime)
      },
      set(newVal) {
        this.clone.datetime = newVal
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
      this.clone.commit()
      this.updateEvent([this.clone.id, this.clone])
        .then(() => {
          this.$parent.close()
          this.alertEventEdited()
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
