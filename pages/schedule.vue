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
          :event-ripple="false"
          locale="ja-jp"
          :day-format="(timestamp) => new Date(timestamp.date).getDate()"
          :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'"
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
              :value="selectedOpen"
              :close-on-content-click="true"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                min-width="350px"
                flat
              >
                <v-toolbar>
                  <v-icon>mdi-pencil</v-icon>
                  <v-text-field
                    v-model="eventName"
                    solo
                    label="アクションを入力..."
                    flat
                    autofocus
                    class="mt-7"
                  />
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

                  <v-btn
                    icon
                    small
                    class="mr-1"
                    @click="deleteEvent"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details" />
                  <v-list-item>
                    <v-row align="center">
                      <v-col cols="2">
                        <v-list-item-title>
                          <v-icon>mdi-clock-outline</v-icon>
                        </v-list-item-title>
                      </v-col>
                      <v-col v-if="getYear(selectedEvent.start) === getYear(selectedEvent.end)" cols="5 text-center">
                        <v-list-item-subtitle>
                          {{ getYear(selectedEvent.start) }}
                        </v-list-item-subtitle>
                      </v-col>
                      <v-col v-else cols="6" class="pl-0 pr-0">
                        <v-list-item-subtitle>
                          {{ getYear(selectedEvent.start) }} 〜 {{ getYear(selectedEvent.end) }}
                        </v-list-item-subtitle>
                      </v-col>
                      <v-col class="pr-0">
                        <v-list-item-subtitle>{{ convertTime(selectedEvent.start) }}〜{{ convertTime(selectedEvent.end) }}</v-list-item-subtitle>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    small
                    @click="newEvent"
                  >
                    保存する
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

import '@/assets/css/schedule.scss'

export default {

  data: () => ({
    value: '',
    events: [],
    colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    selectedElement: null,
    selectedOpen: false,
    selectedEvent: {},
    menu: false,
    eventName: ''
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
          name: 'イベント',
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

    // 年を取得
    getYear (tms) {
      return new Date(tms).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' })
    },

    // ミリ秒を変換する
    convertTime (tms) {
      return new Date(tms).toLocaleString('ja-JP', { hour: 'numeric', minute: 'numeric' })
    },

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
    },
    newEvent () {
      this.selectedEvent.name = this.eventName
      this.selectedOpen = false
      this.$store.dispatch('addEvent')
    },
    deleteEvent () {
      this.selectedEvent = {}
      this.selectedOpen = false
    }
  }
}
</script>
