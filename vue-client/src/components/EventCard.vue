<template>
  <div class="card " :class="{ isAdmin: isAdmin }">
    <header class="card-header">
      <p class="c">
        {{ formattedDate }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <RunDescription :gmrEvent="gmrEvent" />
      </div>
    </div>
    <footer class="card-footer" v-if="isAdmin">
      <a href="#" class="card-footer-item" @click="editEventModal()">Edit</a>
      <a href="#" class="card-footer-item" @click="deleteEvent(gmrEvent)"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import { formatDate } from '../utils'
import RunDescription from './RunDescription'
import EditEventForm from './EditEventForm'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'EventCard',
  components: { RunDescription },
  props: { gmrEvent: { type: Object } },
  data: () => ({
    isModalActive: false
  }),
  computed: {
    windowWidth() {
      return window.innerWidth
    },
    isModalFullscreen() {
      return !(this.windowWidth > 450)
    },
    formattedDate() {
      return formatDate(this.gmrEvent.date)
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    title() {
      return this.gmrEvent.title
    },
    modalWidth() {
      return '640px'
    }
  },
  methods: {
    ...mapActions('gmrEvents', {
      removeEvent: 'remove'
    }),
    async deleteEvent(gmrEvent) {
      let result = await this.confirmDeleteEvent()
      if (result) {
        this.removeEvent(gmrEvent._id).catch(err => {
          throw new Error(err.message)
        })
      }
    },
    async confirmDeleteEvent() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: 'Deleting event',
          message:
            'Are you sure you want to <b>delete</b> this event? This action cannot be undone.',
          confirmText: 'Delete Event',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    },
    editEventModal() {
      this.$buefy.modal.open({
        parent: this,
        component: EditEventForm,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: this.isModalFullscreen,
        props: { gmrEvent: this.gmrEvent }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: fit-content;
  margin: 0.25rem;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  text-align: left;

  &.isAdmin {
    justify-content: space-between;
  }
}
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
}
.card-content {
  padding: 0.5rem;
  margin: 0.5rem;
}
.title {
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
}
.address {
  text-align: center;
}
.run-link {
  margin-top: 1rem;
}
.card-footer {
  justify-self: flex-end;
}
.detail-paragraph {
  text-align: left;
}
</style>
