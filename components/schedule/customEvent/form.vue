/* eslint-disable eqeqeq */
<template>
  <!-- 日付まとめて入力ボタン -->
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      max-height="150px"
      @click:outside="cancelForm"
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
            @click="bookSelect"
            :value="eventName"
          >
            <v-icon>mdi-fire</v-icon>
            アクションをまとめて入力する
          </v-btn>
        </div>
      </template>
      <v-card>
        <!-- タイトル -->
        <v-card-title class="pb-0">
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
                    :color="selectedColor"
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
          <v-form ref="date_form">
            <v-row>
              <v-col cols="5"  class="pt-0 mt-0">
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
                      :rules="rulesDate"
                       class="pt-0 mt-0"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    locale="jp-ja"
                    :day-format="date => new Date(date).getDate()"
                    :allowed-dates="allowedDate"
                    @input="inputMenu = false"
                  />
                </v-menu>
              </v-col>
              <!-- 開始時間入力 -->
              <v-col align-self="center" cols="3"  class="pt-0 mt-0">
                <v-menu
                  ref="menu"
                  v-model="timePickerMenuStart"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                  class="pt-0 mt-0"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="timePickerStart"
                      label="開始時間"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="rulesTime"
                      class="pt-0 mt-0"
                     />
                  </template>
                  <v-time-picker
                    v-if="timePickerMenuStart"
                    v-model="timePickerStart"
                    full-width
                    format="24hr"
                    :allowed-hours="timePickerStartHours"
                    :allowed-minutes="timePickerStartMnites"
                    @change="startTimeSave(timePickerStart)"
                    @click:hour="getHoursStart"
                  />
                </v-menu>
              </v-col>
              <!-- 終了時間 -->
              <v-col cols="3" class="pt-0 mt-0">
                <v-menu
                  ref="menu"
                  v-model="timePickerMenuEnd"
                  :close-on-content-click="false"
                  :nudge-right="40"
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
                      :rules="rulesTime"
                      class="pt-0 mt-0"
                    />
                  </template>
                  <v-time-picker
                    v-if="timePickerMenuEnd"
                    v-model="timePickerEnd"
                    full-width
                    format="24hr"
                    :allowed-hours="timePickerEndHours"
                    :allowed-minutes="timePickerEndMnites"
                    :disabled="disabled"
                    @click:hour="getHoursEnd"
                    @change="endTimeSave(timePickerEnd)"
                  />
                </v-menu>
              </v-col>
              <!-- 選択した本を表示 -->
              <ScheduleBook />

              <!-- 日数選択 -->
              <v-col
                class="d-flex mt-3"
                cols="3"
                sm="6"
              >
                <v-select
                  v-model="selectDate"
                  :items="selectDateItems"
                  item-text="state"
                  item-value="id"
                  label="続ける日数を選ぶ"
                  dense
                  single-line
                  class="ml-5"
                  :rules="rulesLongDate"
                />
              </v-col>
            </v-row>
            <small class="ml-5">習慣化おすすめは60日です。運動などは習慣化が難しいため250日をおすすめします。</small>
          </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="cancelForm"
          >
            閉じる
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addEvent"
          >
          <!-- addEvent追加 -->
            保存する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      eventName: '',
      selectedEvent: {},
      selectedColor: '#2196F3',
      datevVlue: moment().format('yyyy-MM-DD'),
      dateMenu: false,
      date: '',
      modal: false,
      inputMenu: false,
      timeValue: '',
      timePickerMenuStart: false,
      timePickerMenuEnd: false,
      timePickerStart: null,
      timePickerEnd: null,
      dialog: false,
      getStartTime: null,
      getEndtime: null,
      disabled: true,
      // 日数選択
      selectDateItems: [
        { id:1, state: '60日(約２ヶ月)'}, 
        { id:2, state : '250日(約８ヶ月)' }, 
      ],
      selectDate: '',
      // validation用
      rulesTime: [value => !!value || '時間を選択してください' ],
      rulesLongDate:[value => !!value || '日数を選択してください'],
      rulesDate:[value => !!value || '日付を選択してください']
    }
  },

  computed: {
    index () {
     return this.$store.state.schedule.longTermIndex
    },

    scheduleBook () {
      return this.$store.state.book.scheduleBook
    }

  },

  methods: {

    timeInterval (time) {
      return time % 15 === 0
    },
    // 開始時間保存
    startTimeSave (value) {
      this.timePickerStart = value
      this.timePickerMenuStart = false
      this.disabled = false
    },
    // 終了時間保存
    endTimeSave (value) {
      this.timePickerEnd = value
      this.timePickerMenuEnd = false
    },
    
    // 選択「月」を制限
    allowedDate (value) {
      return value >= moment().format('YYYY-MM-DD')
    },

    // 開始時間選択「時間」を制限
    timePickerStartHours (value) {
    // return value !== new Date().getHours()
      const today = moment().format('YYYY-MM-DD')
      if (this.date === today) {
        return value >= new Date().getHours()
      } else {
        return true
      }
    },

    // 開始時間を取得
    getHoursStart (value) {
      this.getStartTime = value
    },
    // 開始時間選択「分」を制限
    timePickerStartMnites (value) {
      const todayHours = new Date().getHours()
      if (todayHours === this.getStartTime) {
        if (value >= new Date().getMinutes()) { return this.timeInterval(value) }
        return false
      } else {
        return this.timeInterval(value)
      }
    },

    // 終了時間選択「時間」を制限
    timePickerEndHours (value) {
      return value >= this.timePickerStart.substr(0, 2)
    },

    // 終了時間「時間」を取得
    getHoursEnd (value) {
      this.getEndtime = value
    },

    // 終了時間選択「分」を制限
    timePickerEndMnites (value) {
      const startTimeHours = this.timePickerStart.substr(0, 2)
      const startTimeMinites = this.timePickerStart.substr(3, 4)
      if (startTimeHours == this.getEndtime) {
        if (value > startTimeMinites) { return this.timeInterval(value) }
        return false
      } else {
        return this.timeInterval(value)
      }
    },
    // イベント追加
    addEvent () {
      if(this.$refs.date_form.validate()) {
        const selectDate = this.selectDate
        // const selectDateIdMap = {1: 60, 2: 250}
        const selectDateIdMap = {1: 5, 2: 250}
        let arrayEvent = []
        
          for (let i=0; i < selectDateIdMap[selectDate]; i++) {
            const date = moment(`${this.date}`).add(i, 'd').format('YYYY-MM-DD')
            const dateTimeStart = `${date} ${this.timePickerStart}`
            const dateTimeEnd = `${date} ${this.timePickerEnd}`
            const data = {
              name: this.eventName,
              color: this.selectedColor,
              start: Date.parse(dateTimeStart), 
              end: Date.parse(dateTimeEnd),
              timed: true,
              post_id: this.scheduleBook ? this.scheduleBook.id : null,
              long_time: true,
              long_term_id: this.index
            }
            arrayEvent.push(data)
          }
        this.$store.dispatch('schedule/manyAdditionalEvents', arrayEvent)
        this.$store.commit('schedule/switchSummarizeBookSelectedSchedul', false)
        this.dialog = false
      }

    },

    changeColor (color) {
      this.selectedColor = color
    },

    cancelForm () {
      this.dialog = false
      this.$refs.date_form.reset()
      this.$store.commit('schedule/switchSummarizeBookSelectedSchedul', false)
    },

    bookSelect () {
      this.$store.commit('schedule/switchSummarizeBookSelectedSchedul', true)
    },
    // schedule.vueからdialogとeventNameを受け取り
    dialogSwitch (value) {
      this.eventName = value
      this.dialog = true
    }
  }
}
</script>
