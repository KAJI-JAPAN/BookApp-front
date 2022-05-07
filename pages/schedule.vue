<template>
  <v-row class="fill-height">
    <!-- アラート -->
    <AlertSuccess>
      行動を保存しました
    </AlertSuccess>
    <AlertDeleteText>
      行動を削除しました
    </AlertDeleteText>
    <AlertError>
      エラー： しばらくしてからお試しください
    </AlertError>

    <!-- ヘッダー -->
    <v-col cols="12">
      <v-app-bar>
        <v-app-bar-title class="mr-8">
          習慣化カレンダー
        </v-app-bar-title>
        <v-btn
          outlined
          class="mr-4"
          color="grey darken-2"
          @click="setToday"
        >
          今日
        </v-btn>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="$refs.calendar.next()"
        >
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
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
        <ScheduleForm ref="form" />
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
                    <div />
                    <!-- 削除ボタン -->
                    <div v-if="selectedEvent.id && !selectedEvent.long_time">
                      <v-btn
                        icon
                        small
                        class="mr-1"
                        @click="deleteEvent(event)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                    <!-- まとめて入力用 -->
                    <!-- 削除ダイアログ -->
                    <div v-else-if="selectedEvent.id && selectedEvent.long_time">
                      <v-row justify="center">
                        <v-dialog
                          v-model="deleteDialog"
                          persistent
                          max-width="290"
                          :retain-focus="false"
                          @click:outside="deleteDialog=false"
                        >
                          <template #activator="{ on, attrs }">
                            <v-btn
                              icon
                              small
                              class="ma-3"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-container
                              class="px-0"
                              fluid
                            >
                              <v-card-title>まとめて予定の削除</v-card-title>
                              <v-container fluid>
                                <v-radio-group
                                  v-model="radios"
                                  mandatory
                                >
                                  <v-radio
                                    v-for="(item, index) in daleteSelect"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.id"
                                    color="red"
                                    class="pa-2"
                                  />
                                </v-radio-group>
                              </v-container>
                              <v-card-actions>
                                <v-spacer />

                                <v-btn
                                  color="grey darken-1"
                                  text
                                  @click="deleteDialog = false"
                                >
                                  キャンセル
                                </v-btn>

                                <v-btn
                                  color="primary"
                                  text
                                  @click="deleteGroup"
                                >
                                  OK
                                </v-btn>
                              </v-card-actions>
                            </v-container>
                          </v-card>
                        </v-dialog>
                      </v-row>
                    </div>
                  </v-toolbar>
                  <v-container>
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
                    <!-- 登録した本を表示 -->
                    <ScheduleBook />
                  </v-container>
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
import { mapState } from 'vuex'

export default {
  auth: false,
  middleware: 'authenticated',
  data () {
    return {
      value: '',
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      // dragEvent: null,
      dragStart: null,
      createStart: null,
      extendOriginal: null,
      selectedElement: null,
      selectedOpen: false,
      menu: false,
      eventName: '',
      dialog: false,
      datevVlue: moment().format('yyyy-MM-DD'),
      pendingColor: '',
      radios: null,
      deleteDialog: false,
      min: null,
      max: null,
      daleteSelect: [
        { id: 1, text: '今回の予定を削除する' },
        { id: 2, text: '全ての予定を削除する' }
      ]
    }
  },

  computed: {
    ...mapState('schedule', ['events', 'selectedEvent', 'bookSelectedSchedule', 'summarizeBookSelectedSchedule', 'dragEvent']),

    createEvent () {
      return this.$store.state.schedule.createEvent
    },
    selectedTodo () {
      return this.$store.state.todos.selectedTodo
    },
    scheduleBook () {
      return this.$store.state.book.scheduleBook
    }
  },

  mounted () {
    this.$store.commit('schedule/resetEvent')
    this.$axios.$get(url.SCHEDULE_API)
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
            timed: res.timed,
            long_time: res.long_time,
            post_id: res.post_id,
            long_term_id: res.long_term_id
          }
          this.$store.commit('schedule/setEvent', data)
        })
        this.eventName ||= this.selectedTodo.content
        if (this.bookSelectedSchedule) {
          this.selectedOpen = true
        } else if (this.summarizeBookSelectedSchedule) {
          this.$refs.form.dialogSwitch(this.eventName)
        }
      })
  },

  methods: {
    setToday () {
      this.value = moment().format('yyyy-MM-DD')
    },

    startDrag ({ event, timed }) {
      if (this.events) {
        if (event && timed) {
          this.$store.commit('schedule/setDragEvent', event)
          this.dragTime = null
          this.extendOriginal = null
        }
      }
    },
    startTime (tms) {
      const mouse = this.toTime(tms)
      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start

        this.dragTime = mouse - start
      } else {
        this.createStart = this.roundTime(mouse)
        const event = {
          name: '',
          color: '#2196F3',
          start: this.createStart,
          end: this.createStart,
          timed: true,
          post_id: this.scheduleBook ? this.scheduleBook.id : null
        }
        this.$store.commit('schedule/setCreateEvent', event)
        this.$store.commit('schedule/pushCreateEvent', this.createEvent)
      }
    },
    extendBottom (event) {
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
        this.$store.commit('schedule/setTimeDragEvent', { start: newStart, end: newEnd })
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false)
        const min = Math.min(mouseRounded, this.createStart)
        const max = Math.max(mouseRounded, this.createStart)
        // バックアップ用 編集した時にselectedEventに時間を反映させたい
        this.min = min
        this.max = max

        this.$store.commit('schedule/updateCreateEvent', { start: min, end: max })
      }
    },

    endDrag ({ nativeEvent, event }) {
      this.$store.commit('schedule/setCreateEvent', null)
      this.$store.commit('schedule/setDragEvent', null)
      this.dragTime = null
      this.createStart = null
      this.extendOriginal = null
      this.showEvent({ nativeEvent, event })
    },
    cancelDrag () {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.$store.commit('schedule/isCancelDragEvent')
        }
      }

      this.$store.commit('schedule/setCreateEvent', null)
      this.createStart = null
      this.dragTime = null
      this.$store.commit('schedule/setDragEvent', null)
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
        // 登録済みの場合はDBからデータを取得する
        // this.selectedEvent.id ? this.$store.dispatch('schedule/showEvent', event) : this.$store.commit('schedule/setSelectedEvent', event)
        if (this.selectedEvent.id) { this.$store.dispatch('schedule/showEvent', { event, min: this.min, max: this.max }) }
        this.$store.commit('schedule/setSelectedEvent', event)

        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
        this.eventName = this.selectedEvent.name || this.selectedTodo.content
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
      this.pendingColor = this.selectedEvent.color
      this.$store.commit('schedule/setSelectedEventColor', color)
    },

    // イベント作成と編集
    newEvent () {
      this.$store.commit('schedule/setCreateEvent', null)
      if (!this.selectedEvent.id) {
        this.$store.commit('schedule/setSelectedEventName', this.eventName)
        this.$store.dispatch('schedule/addEvent', this.selectedEvent)
      } else {
        this.$store.commit('schedule/setSelectedEventName', this.eventName)
        this.$store.commit('schedule/setIdEvent', { post: this.scheduleBook.id })
        this.$store.dispatch('schedule/updateEvent', this.selectedEvent)
      }
      this.$store.commit('schedule/cancelEvent')
      this.eventName = ''
      this.selectedOpen = false
    },
    // 既存のイベントを削除
    deleteEvent (event) {
      this.selectedOpen = false
      this.$store.dispatch('schedule/deleteEvent', this.selectedEvent)
    },

    // まとめて登録したイベントの削除
    deleteGroup () {
      if (this.radios === 1) {
        this.deleteEvent()
      } else if (this.radios === 2) {
        this.$store.dispatch('schedule/manyDeletionEvents', this.selectedEvent)
      }
      this.selectedOpen = false
    },

    // DBに登録していない要素は削除する
    cancelEvent () {
      if (!this.selectedEvent.id) {
        this.$store.commit('schedule/cancelEvent')
      } else {
        this.$store.commit('schedule/revertingEvents', this.selectedEvent)
      }
      if (this.pendingColor) { this.$store.commit('schedule/setSelectedEventColor', this.pendingColor) }
      this.$store.commit('book/clearScheduleBook')
      this.$store.commit('schedule/deleteSelectedEvent')
      this.$store.commit('schedule/switchBookSelectedSchedule', false)
      this.selectedOpen = false
    }
  }
}
</script>
