<template>
  <v-row class="fill-height">
    <!-- アラート -->
    <AlertSuccess>
      行動を保存しました
    </AlertSuccess>
    <AlertDeleteText>
      行動を削除しました
    </AlertDeleteText>

    <!-- ヘッダー -->
    <v-col cols="12">
      <v-app-bar>
        <v-app-bar-title class="mr-8">
          習慣化カレンダー
        </v-app-bar-title>
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
        <v-app-bar-title
          v-if="$refs.calendar"
          class="ma-6 pa-3"
        >
          {{ $refs.calendar.title }}
        </v-app-bar-title>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-app-bar>
    </v-col>

    <!-- 月カレンダー -->
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
        <v-divider class="ma-8" />

        <!-- 日付まとめて入力ボタン -->
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template #activator="{ on, attrs }">
              <div class="text-center">
                <v-btn
                  rounded
                  color="red"
                  dark
                  outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-fire</v-icon>
                  アクションをまとめて入力する
                </v-btn>
              </div>
            </template>
            <v-card>
              <!-- タイトル -->
              <v-card-title>
                <v-col cols="10">
                  <v-text-field
                    v-model="eventName"
                    solo
                    label="アクションを入力..."
                    flat
                    autofocus
                    class="mt-7"
                    prepend-icon="mdi-pencil"
                  />
                </v-col>

                <!-- 色変更ボタンー -->
                <v-col>
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon
                          :color="pendingColor"
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
                </v-col>
              </v-card-title>

              <!-- 開始日入力 -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-menu
                        v-model="inputMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="開始日"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                          locale="jp-ja"
                          :day-format="date => new Date(date).getDate()"
                          @input="inputMenu = false"
                        />
                      </v-menu>
                    </v-col>
                    <!-- 開始時間入力 -->
                    <v-col align-self="center" cols="3">
                      <v-menu
                        ref="menu"
                        v-model="timePickerMenuStart"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="timePickerStart"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="timePickerStart"
                            label="開始時間"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="timePickerMenuStart"
                          v-model="timePickerStart"
                          full-width
                          format="24hr"
                          @click:minute="$refs.menu.save(timePickerStart)"
                        />
                      </v-menu>
                    </v-col>
                    <!-- 終了時間 -->
                    <v-col cols="3">
                      <v-menu
                        ref="menu"
                        v-model="timePickerMenuEnd"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="timePickerEnd"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="timePickerEnd"
                            label="終了時間"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="timePickerMenuEnd"
                          v-model="timePickerEnd"
                          full-width
                          format="24hr"
                          @click:minute="$refs.menu.save(timePickerEnd)"
                        />
                      </v-menu>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                        label="Interests"
                        multiple
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  閉じる
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  保存する
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- <ScheduleEventCustomEventForm /> -->
      </v-col>

      <!-- 週カレンダー -->
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
              <!-- イベント作成クリック時のダイアログ -->
              <v-dialog
                v-model="selectedOpen"
                persistent
                max-width="500px"
                :retain-focus="false"
                @click:outside="cancelEvent"
              >
                <v-card
                  min-width="350px"
                  flat
                >
                  <v-toolbar>
                    <v-text-field
                      v-model="eventName"
                      solo
                      label="アクションを入力..."
                      flat
                      autofocus
                      class="mt-7"
                      prepend-icon="mdi-pencil"
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
                    <!-- 登録した日付と時間を表示 -->
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

  data () {
    return {
    // カレンダー用
      value: '',
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      dragEvent: null,
      dragStart: null,
      createStart: null,
      extendOriginal: null,
      selectedElement: null,
      selectedOpen: false,
      menu: false,
      eventName: '',
      // selectedEvent: {},
      dialog: false,
      datevVlue: moment().format('yyyy-MM-DD'),
      pendingColor: '',

      // まとめて入力用
      dateMenu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      inputMenu: false,
      timeValue: '',
      timePickerMenuStart: false,
      timePickerMenuEnd: false,
      timePickerStart: null,
      timePickerEnd: null
    }
  },

  computed: {

    events () {
      return this.$store.state.schedule.events
    },

    createEvent () {
      return this.$store.state.schedule.createEvent
    },

    selectedEvent () {
      return this.$store.state.schedule.selectedEvent
    }
  },

  mounted () {
    this.$axios.$get(url.SCHEDULE_API + '.json')
      .then((response) => {
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
          this.$store.commit('schedule/setEvent', data)
        })
      })
  },

  methods: {
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
        // store用
        const event = {
          name: '',
          color: '#2196F3',
          start: this.createStart,
          end: this.createStart,
          timed: true
        }
        this.$store.commit('schedule/setCreateEvent', event)
        this.$store.commit('schedule/pushCreateEvent', this.createEvent)
      }
    },
    extendBottom (event) {
      // store用
      this.$store.commit('schedule/setCreateEvent', event)
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

        // store用
        this.$store.commit('schedule/updateCreateEvent', { start: min, end: max })
      }
    },
    endDrag ({ nativeEvent, event }) {
      // store用
      this.$store.commit('schedule/setCreateEvent', null)
      this.dragTime = null
      this.dragEvent = null
      this.createStart = null
      this.extendOriginal = null
      this.showEvent({ nativeEvent, event })
    },
    cancelDrag () {
      if (this.createEvent) {
        if (this.extendOriginal) {
          // stror用
          this.$store.commit('schedule/isCancelDragEvent')
        }
      }

      this.$store.commit('schedule/setCreateEvent', null)
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

    // イベント編集menuを表示
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        // this.selectedEvent = event
        // store
        this.$store.commit('schedule/setSelectedEvent', event)
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
        this.eventName = this.selectedEvent.name
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },

    //  表示するイベントカラーを仮保存
    changeColor (color) {
      // if (this.selectedEvent.id) {
      //   this.pendingColor = this.selectedEvent.color
      //   this.$store.commit('schedule/setSelectedEventColor', color)
      // } else {
      //   this.$store.commit('schedule/setSelectedEventColor', color)
      // }
      this.pendingColor = this.selectedEvent.color
      this.$store.commit('schedule/setSelectedEventColor', color)
    },

    // イベント作成
    newEvent () {
      this.selectedOpen = false
      // this.selectedEvent.name = this.eventName
      // this.selectedEvent.color = this.pendingColor
      this.$store.commit('schedule/setSelectedEventName', this.eventName)
      this.$store.dispatch('schedule/addEvent', this.selectedEvent)
      this.eventName = ''
    },
    // 既存のイベントを削除
    deleteEvent () {
      this.selectedOpen = false
      this.$store.dispatch('schedule/deleteEvent', this.selectedEvent)
    },

    // DBに登録していない要素は削除する
    cancelEvent () {
      if (!this.selectedEvent.id) { this.$store.commit('schedule/cancelEvent') }
      this.selectedOpen = false
      this.$store.commit('schedule/setSelectedEventColor', this.pendingColor)
    }
  }
}
</script>
