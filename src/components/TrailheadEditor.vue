<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
      </header>
      <section class="modal-card-body">
        <fieldset class="event-fieldset">
          <b-field label="Name">
            <b-input
              placeholder="Event title"
              v-model="item.name"
              type="text"
            ></b-input>
          </b-field>
          <b-field label="Address">
            <b-input
              placeholder="Event title"
              v-model="item.address"
              type="text"
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
          @click.prevent="handleSave()"
        >
          Save
        </button>
        <button class="button" type="button" @click.prevent="item.reset()">
          Reset
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'TrailheadEditor',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      street: null,
      city: null,
      zipCode: null
    }
  },
  computed: {
    isValidTrailhead() {
      if (this.item.name.length > 2 && this.item.address.length > 10) {
        return true
      }
      return false
    },
    modalTitle() {
      if (this.$route.name === 'AddEvent') {
        return 'Add Trailhead'
      }
      return 'Edit Trailhead'
    }
  },
  methods: {
    alertEventEdited() {
      this.$buefy.dialog.alert('Event successfully edited!')
    },
    handleSave() {
      if (this.isValidTrailhead) {
        this.item.save().then(this.$parent.close())
      } else this.$buefy.dialog.alert('Invalid entry, please correct.')
    }
  }
})
</script>
<style scoped lang="scss">
form {
  padding: 1.5rem;
  min-height: 300px;
  min-width: 300px;
  background: white;
}
* {
  background: white;
}
</style>
