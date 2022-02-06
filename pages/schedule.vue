<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          type="week"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          locale="ja-jp"
          :day-format="(timestamp) => new Date(timestamp.date).getDate()"
          :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'"
          @change="getEvents"
          @mousedown:event="startDrag"
          @click:event="showEvent"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template #event="{ event, timed, eventSummary }">
            <div
              class="v-event-draggable"
              v-html="eventSummary()"
            />
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            />

            <!-- イベントクリックした時の編集表示 -->
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-2"
                min-width="350px"
                flat
              >
                <v-toolbar>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name" />
                  <v-spacer />

                  <!-- 色変更ボタン -->

                  <div class="text-center">
                    <v-menu offset-y>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon
                            :color="selectedEvent.color"
                          >
                            mdi-brightness-1
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(color, index) in colors"
                          :key="index"
                        >
                          <v-icon
                            :color="color"
                            @click="changeColor(color)"
                          >
                            mdi-brightness-1
                          </v-icon>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>

                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details" />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!--  -->
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    value: '',
    events: [],
    colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    selectedElement: null,
    selectedOpen: false,
    selectedEvent: {},
    menu: false
  }),
  methods: {
    startDrag ({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event
        this.dragTime = null
        this.extendOriginal = null
      }
    },
    startTime (tms) {
      const mouse = this.toTime(tms)

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start

        this.dragTime = mouse - start
      } else {
        this.createStart = this.roundTime(mouse)
        this.createEvent = {
          // name: `Event #${this.events.length}`,
          color: '#2196F3',
          start: this.createStart,
          end: this.createStart,
          timed: true
        }

        this.events.push(this.createEvent)
      }
    },
    extendBottom (event) {
      this.createEvent = event
      this.createStart = event.start
      this.extendOriginal = event.end
    },
    mouseMove (tms) {
      const mouse = this.toTime(tms)

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start
        const end = this.dragEvent.end
        const duration = end - start
        const newStartTime = mouse - this.dragTime
        const newStart = this.roundTime(newStartTime)
        const newEnd = newStart + duration

        this.dragEvent.start = newStart
        this.dragEvent.end = newEnd
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false)
        const min = Math.min(mouseRounded, this.createStart)
        const max = Math.max(mouseRounded, this.createStart)

        this.createEvent.start = min
        this.createEvent.end = max
      }
    },
    endDrag () {
      this.dragTime = null
      this.dragEvent = null
      this.createEvent = null
      this.createStart = null
      this.extendOriginal = null
    },
    cancelDrag () {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal
        } else {
          const i = this.events.indexOf(this.createEvent)
          if (i !== -1) {
            this.events.splice(i, 1)
          }
        }
      }

      this.createEvent = null
      this.createStart = null
      this.dragTime = null
      this.dragEvent = null
    },
    roundTime (time, down = true) {
      const roundTo = 15 // minutes
      const roundDownTime = roundTo * 60 * 1000

      return down
        ? time - time % roundDownTime
        : time + (roundDownTime - (time % roundDownTime))
    },
    toTime (tms) {
      return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
    },
    // getEventColor (event) {
    //   const rgb = parseInt(event.color.substring(1), 16)
    //   const r = (rgb >> 16) & 0xFF
    //   const g = (rgb >> 8) & 0xFF
    //   const b = (rgb >> 0) & 0xFF

    //   return event === this.dragEvent
    //     ? `rgba(${r}, ${g}, ${b}, 0.7)`
    //     : event === this.createEvent
    //       ? `rgba(${r}, ${g}, ${b}, 0.7)`
    //       : event.color
    // },

    // 初期イベント表示のため？

    // getEvents ({ start, end }) {
    //   const events = []

    //   const min = new Date(`${start.date}T00:00:00`).getTime()
    //   const max = new Date(`${end.date}T23:59:59`).getTime()
    //   const days = (max - min) / 86400000
    //   const eventCount = this.rnd(days, days + 20)

    //   for (let i = 0; i < eventCount; i++) {
    //     const timed = this.rnd(0, 3) !== 0
    //     const firstTimestamp = this.rnd(min, max)
    //     const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
    //     const start = firstTimestamp - (firstTimestamp % 900000)
    //     const end = start + secondTimestamp

    //     events.push({
    //       name: this.rndElement(this.names),
    //       color: this.rndElement(this.colors),
    //       start,
    //       end,
    //       timed
    //     })
    //   }

    //   this.events = events
    // },

    // イベント編集
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },

    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    rndElement (arr) {
      return arr[this.rnd(0, arr.length - 1)]
    },
    changeColor (color) {
      this.selectedEvent.color = color
    }
  }
}
</script>
