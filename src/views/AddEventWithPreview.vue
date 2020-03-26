<template>
  <Container>
    <div class="add-event-container">
      <h2 class="title">Add Event</h2>
      <form @submit.prevent="onSubmit()">
        <fieldset class="event-fieldset">
          <b-field label="Title">
            <b-input
              placeholder="Event title"
              v-model="clone.title"
              name="title"
              type="text"
              ref="title"
            ></b-input>
          </b-field>
          <b-field label="Select day and time">
            <b-datetimepicker
              rounded
              placeholder="Click to select..."
              icon="calendar-today"
              :datepicker="{ showWeekNumber }"
              :timepicker="{ enableSeconds, hourFormat: format }"
              v-model="clone.datetime"
            >
            </b-datetimepicker>
          </b-field>
          <b-field label="Trailhead" class="trailhead-wrapper">
            <div class="trailhead-content">
              <b-select
                name="trailhead"
                label="Trailhead"
                placeholder="Select a trailhead"
                v-model="clone.trailhead"
              >
                <option
                  v-for="trailhead in trailheads"
                  :value="trailhead"
                  :key="trailhead.name"
                >
                  {{ trailhead.name }}
                </option>
              </b-select>
              <AddTrailheadButton />
            </div>
          </b-field>
          <b-field label="Description">
            <Tiptap
              :clear="shouldClearContent"
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
        <button class="button add-event-button is-primary" type="submit">
          Add Event
        </button>
      </form>
    </div>
    <div class="text-container" v-if="windowWidth > 450">
      <WelcomeToGmr
        :gmrEvent="clone"
        :date="formattedDate"
        class="welcome-to-gmr"
      />
      <RunDescription class="run-description" :gmrEvent="clone" />
    </div>
  </Container>
</template>

<script>
import Vue from 'vue'
import Container from '@/UIComponents/Container'
import WelcomeToGmr from '@/components/WelcomeToGmr'
import RunDescription from '@/components/RunDescription'
import AddTrailheadButton from '@/components/AddTrailheadButton'
import { formatDate } from '../utils'
import Tiptap from '../components/Tiptap'
import { format, addHours, subHours } from 'date-fns'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default Vue.extend({
  name: 'AddEventWithPreview',
  components: {
    Container,
    RunDescription,
    WelcomeToGmr,
    Tiptap,
    AddTrailheadButton
  },
  data: () => ({
    currentGmrEvent: null,
    clone: null,
    rawEventDetails: '',
    showWeekNumber: false,
    formatAmPm: true,
    enableSeconds: false,
    shouldClearContent: false
  }),
  created() {
    const { GmrEvent } = this.$FeathersVuex.api
    this.currentGmrEvent = new GmrEvent({})
    this.clone = this.currentGmrEvent.clone()
    this.findTrailheads({
      query: {}
    })
  },
  computed: {
    ...mapState('gmrEvents', { areGmrEventsLoading: 'isFindPending' }),
    ...mapGetters('gmrEvents', { findGmrEventsInStore: 'find' }),
    ...mapState('trailheads', { areTrailheadsLoading: 'isFindPending' }),
    ...mapGetters('trailheads', { findTrailheadsInStore: 'find' }),
    trailheads() {
      return this.findTrailheadsInStore({
        query: this.queryTrailheads
      }).data
    },
    trailheadId() {
      return this.clone && this.clone.trailhead && this.clone.trailhead.id
    },
    queryTrailheads() {
      return {
        $limit: 100,
        $sort: {
          name: 1
        }
      }
    },
    isTitleValid() {
      if (this.clone.title && this.clone.title.length > 3) {
        return true
      }
      return false
    },
    isDetailValid() {
      return this.clone.details && this.clone.details.length > 20
    },
    isRunRouteLinkValid() {
      return this.clone && this.clone.runRouteLink
    },
    isTrailheadValid() {
      return (
        this.clone &&
        this.clone.trailhead &&
        this.clone.trailhead.name &&
        this.clone.trailhead.address
      )
    },
    time() {
      const eventTime = format(this.clone.datetime, 'h:mma')
      return eventTime
    },
    format() {
      return this.formatAmPm ? '12' : '24'
    },
    querySameDay() {
      const addTwo = addHours(this.clone.datetime, 12)
      const subtractTwo = subHours(this.clone.datetime, 12)
      return {
        date: {
          $lte: addTwo.toISOString(),
          $gte: subtractTwo.toISOString()
        }
      }
    },
    sameDayGmrEvents() {
      return this.findGmrEventsInStore({
        query: this.querySameDay
      }).data
    },
    formattedDate() {
      return formatDate(this.clone.datetime)
    },
    windowWidth() {
      return window.innerWidth
    },
    isModalFullscreen() {
      return !(this.windowWidth > 450)
    }
  },
  methods: {
    ...mapActions('gmrEvents', {
      createEvent: 'create'
    }),
    ...mapActions('trailheads', { findTrailheads: 'find' }),
    ...mapActions('trailheads', { createTrailhead: 'create' }),
    ...mapMutations('gmrEvents', { addItem: 'addItem' }),
    buefyAlert(text) {
      this.$buefy.dialog.alert(text)
    },
    alertTitle() {
      this.buefyAlert('Please enter a title.')
    },
    alertTrailhead() {
      this.buefyAlert('Please enter a trailhead.')
    },
    async onSubmit(event) {
      this.clone.trailheadId = this.clone.trailhead.id
      this.clone.commit()
      if (!this.isTitleValid) {
        this.alertTitle()
        return
      }
      if (!this.isTrailheadValid) {
        this.alertTrailhead()
        return
      }
      if (!this.isDetailValid) {
        this.buefyAlert('Please enter run details.')
        return
      }
      if (!this.isRunRouteLinkValid) {
        let result = await this.confirmRunRouteLink()
        if (!result) {
          return
        }
      }
      if (this.sameDayGmrEvents.length) {
        let scheduleMultipleEvents = await this.confirmDate()
        if (!scheduleMultipleEvents) {
          this.$router.push('/events')
          return
        }
      }
      this.createEvent(this.transformGmrEventForDB(this.clone))
        .then(async res => {
          let result = await this.confirmAddAnotherEvent()
          if (result) {
            // this.$store.commit('resetForm')
            this.shouldClearContent = true
          } else this.$router.push('/events')
        })
        .catch(err => {
          console.log(err) // eslint-disable-line no-console
          if (err.code === 409) {
            this.$buefy.dialog.alert(
              'Event is duplicate and has already been created.'
            )
          }
        })
    },
    transformGmrEventForDB(gmrEvent) {
      return {
        datetime: gmrEvent.datetime.toISOString(),
        details: gmrEvent.details,
        trailheadId: gmrEvent.trailhead.id,
        runRouteLink: gmrEvent.runRouteLink,
        title: gmrEvent.title
      }
    },
    confirmRunRouteLink() {
      const confirmed = new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: 'Missing Run Route Link',
          message: 'Did  you want to add a run route link?',
          cancelText: 'Yes',
          confirmText: 'Continue without one.',
          type: 'is-success',
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    },
    confirmDate() {
      let eventCount = this.sameDayGmrEvents.length
      console.log('eventCount:', eventCount)
      const confirmed = new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: 'Date Conflict',
          message: `You already have ${eventCount} event(s) scheduled for that date. Are you sure you want to continue?`,
          cancelText: "Don't schedule",
          confirmText: 'Yes, proceed anyway.',
          type: 'is-success',
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      return confirmed
    },
    async confirmAddAnotherEvent() {
      const confirmed = await new Promise((resolve, reject) => {
        this.$buefy.dialog.confirm({
          title: 'Event was created!',
          message: 'Do you want to add another event?',
          confirmText: "No, I'm done.",
          cancelText: 'Yes! More events!',
          onConfirm: () => resolve(false),
          onCancel: () => resolve(true)
        })
      })
      return confirmed
    },
    parseRunRouteLink(string) {
      if (string.indexOf('http') === -1 && string.length > 5) {
        return 'https://' + string
      }
      return string
    }
  }
})
</script>
<style scoped lang="scss">
.text-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin: 2rem;
  overflow: scroll;

  .run-description {
    flex: 1;
  }
  .welcome-to-gmr {
    flex: 1;
  }
}
.field {
  width: calc(100% - 17px);
}
.trailhead-wrapper {
  flex-direction: column;
}
.trailhead-content {
  flex-direction: row;
}
.add-event-container {
  flex: 1;
  overflow: scroll;
  align-self: flex-start;
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
}

.add-event-button {
  width: 85%;
  margin: 1rem;
}

.event-fieldset {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  width: 100%;
}
.input-wrapper {
  margin-top: 2rem;
  height: 45px;
  width: 90%;
  display: flex;
  align-items: center;
  color: black;
  position: relative;
  border: solid 1px rgb(166, 166, 166);
  font-size: 14px;
  line-height: 1.3em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  -webkit-font-smoothing: subpixel-antialiased;
  @media screen and (max-width: 481px) {
    margin-top: 10%;
  }
  :focus-within {
    border: solid 1px green;
  }
  input {
    min-width: 150px;
    outline: none;
    border: 1px transparent solid;
    display: block;
    word-break: normal;
    font: inherit;
    margin: 0px;
    left: 0;
    background: transparent;
    line-height: 2rem;
    cursor: text;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: start;
    -webkit-writing-mode: horizontal-tb !important;
    -webkit-box-direction: normal;
    font-size: 1.5rem;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0.25rem;
    width: 100%;
    color: black;
    :focus {
      cursor: text;
    }
    ::placeholder {
      color: grey;
    }
  }
  label {
    font-size: 1rem;
    font-weight: normal;
    position: absolute;
    top: -25px;
    left: -2%;
    transform: none;
    opacity: 1;
    padding: 0 2%;
    z-index: 1;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: left;
    cursor: default;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

textarea {
  height: 500px;
  width: 400px;
}
.details-container {
  margin-top: 2rem;
  width: 90%;
  display: flex;
  align-items: center;
  color: black;
  position: relative;
  border: solid 1px rgb(166, 166, 166);
  font-size: 14px;
  line-height: 1.3em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  -webkit-font-smoothing: subpixel-antialiased;
  text-align: left;
  label {
    font-size: 1rem;
    font-weight: normal;
    position: absolute;
    top: -25px;
    left: -2%;
    transform: none;
    opacity: 1;
    padding: 0 2%;
    z-index: 1;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: left;
    cursor: default;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
</style>
