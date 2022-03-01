<template>
  <v-row class="fill-height">
    <AlertSuccess>
      行動を保存しました
    </AlertSuccess>
    <AlertDeleteText>
      行動を削除しました
    </AlertDeleteText>

    <!-- 月カレンダー -->
    <v-col cols="12">
      <v-app-bar>
        <v-app-bar-title class="mr-8">習慣化カレンダー</v-app-bar-title>
        <v-btn
          class="ma-2"
          outlined
          @click="setToday"
        >
          今日
        </v-btn>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-appber-title
          v-if="$refs.calendar"
          class="ma-6"
        >
          {{ $refs.calendar.title }}
        </v-appber-title>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-app-bar>
    </v-col>
    <v-row>
      <v-col class="pr-0 ml-5">
        <v-sheet height="300">
          <v-calendar
            ref="calendar"
            v-model="value"
            :day-format="(timestamp) => new Date(timestamp.date).getDate()"
            :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'"
            locale="ja-jp"
          />
        </v-sheet>
      </v-col>
      <!--  -->
      <v-col cols="9" class="pl-0">
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
            @mouseup:event="endDrag"
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
              <!-- <v-menu
              :value="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            > -->
              <v-dialog
                v-model="selectedOpen"
                persistent
                max-width="500px"
                @click:outside="cancelEvent"
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
                    <!-- 削除ボタン -->
                    <v-btn
                      v-if="selectedEvent.id"
                      icon
                      small
                      class="mr-1"
                      @click="deleteEvent"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <!-- <span v-html="selectedEvent.details" /> -->
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
                    <v-btn
                      small
                      @click="cancelEvent()"
                    >
                      閉じる
                    </v-btn>
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
              </v-dialog>
            <!-- </v-menu> -->
            <!--  -->
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import * as url from '@/store/constants/url'
import '@/assets/css/schedule.scss'
import moment from 'moment'
// import { mapState } from 'vuex'

export default {

  data: () => ({
    events: [],
    value: '',
    colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    selectedElement: null,
    selectedOpen: false,
    menu: false,
    eventName: '',
    selectedEvent: {},
    dialog: false,
    datevVlue: moment().format('yyyy-MM-DD')
  }),

  computed: {

    // storeからコピーして参照
    // events () {
    //   // return { ...this.$store.state.schedule.events }
    //   return this.$store.state.schedule.events
    // },

    title () {
      return moment(this.dateValue).format('yyyy年 M月')
    },

    // storeからコピーしたイベントを代入
    cloneEvents () {
      return {
        methods: this.copyEvents(),
        log: console.log(this.events)
      }
    }
  },

  mounted () {
    this.$axios.$get(url.SCHEDULE_API + '.json')
      .then((response) => {
        // this.$store.commit('schedule/responseEvent', response)
        let data
        response.forEach((res) => {
          data = {
            id: res.id,
            name: res.name,
            color: res.color,
            start: res.start,
            end: res.end,
            updated_at: res.created_at,
            timed: res.timed
          }
          this.events.push(data)
          // this.$store.commit('schedule/setEvent', data)
          // console.log(this.cloneevent)
        })
      })
  },

  methods: {
    // store/schedsuleのeventsからデータを取得してschedule.vueのeventsに追加
    // copyEvents () {
    //   const storeEvents = this.$store.state.schedule.events
    //   const clone = storeEvents.map(event => ({
    //     id: event.id,
    //     name: event.name,
    //     color: event.color,
    //     start: event.start,
    //     end: event.end
    //   }))
    //   this.events.push(clone)
    // },
    setToday () {
      this.value = moment().format('yyyy-MM-DD')
    },

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
          name: '',
          color: '#2196F3',
          start: this.createStart,
          end: this.createStart,
          timed: true
        }

        this.events.push(this.createEvent)

        // store用
        // this.$store.commit('schedule/setEvent', this.createEvent)
        // console.log(this.events)
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
    endDrag ({ nativeEvent, event }) {
      this.dragTime = null
      this.dragEvent = null
      this.createEvent = null
      this.createStart = null
      this.extendOriginal = null
      this.showEvent({ nativeEvent, event })
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

          // stror用
          // this.$store.commit('schedule/isCancelDragEvent', this.createEvent)
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

    changeColor (color) {
      this.selectedEvent.color = color
    },

    newEvent () {
      this.selectedEvent.name = this.eventName
      this.selectedOpen = false
      this.$store.dispatch('schedule/addEvent', this.selectedEvent)
    },

    deleteEvent () {
      this.selectedOpen = false
      this.$store.dispatch('schedule/deleteEvent', this.selectedEvent.id)
    },

    cancelEvent () {
      // DBに登録していない要素は削除する
      if (!this.selectedEvent.id) { this.events.pop() }
      this.selectedOpen = false
    }
  }
}
</script>
