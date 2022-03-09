/* eslint-disable eqeqeq */
<template>
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
                    :allowed-dates="allowedDate"
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
                    :allowed-hours="timePickerStartHours"
                    :allowed-minutes="timePickerStartMnites"
                    @change="startTimeSave(timePickerStart)"
                    @click:hour="getHoursStart"
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
                    :allowed-hours="timePickerEndHours"
                    :allowed-minutes="timePickerEndMnites"
                    :disabled="disabled"
                    @click:hour="getHoursEnd"
                    @change="endTimeSave(timePickerEnd)"
                  />
                </v-menu>
              </v-col>
              <!-- 日数選択 -->
              <v-col
                class="d-flex"
                cols="3"
                sm="6"
              >
                <v-select
                  v-model="selectData"
                  :items="selectDateItems"
                  label="続ける日数を選ぶ"
                  dense
                  single-line
                  class="ml-5"
                />
              </v-col>
            </v-row>
            <small class="ml-5">習慣化おすすめは60日です。運動などは習慣化が難しいため250日をおすすめします。</small>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0">
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
            @click="addEvent"
          >
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
      datevVlue: moment().format('yyyy-MM-DD'),
      dateMenu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      selectDateItems: ['60日(約２ヶ月)', '250日(約８ヶ月)', '平日（月-金）'],
      selectDate: ''
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
      console.log(this.date, this.timePickerStart)
    },
    // 終了時間保存
    endTimeSave (value) {
      this.timePickerEnd = value
      this.timePickerMenuEnd = false
      for (let i=0; i< 30; i++) {
         const date = moment(`this.date`).add(i, "days")
         const data = {
         name: this.eventName,
        //  start: Date.parse(`${date} ${this.timePickerStart}`),
        //  end: Date.parse(`${date} ${this.timePickerEnd}` ),
         time: true
        }
        //  console.log(`${date} ${this.timePickerEnd}`)
      }
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
      // const today = new Date().toISOString().substr(0, 10)
      // console.log(this.getStartTime)
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
      // eslint-disable-next-line eqeqeq
      if (startTimeHours == this.getEndtime) {
        if (value > startTimeMinites) { return this.timeInterval(value) }
        return false
      } else {
        return this.timeInterval(value)
      }
    }
    // ,

    // addEvent () {
    //     for (let i=0; i< 30; i++) {
    //      const date = moment(`this.date`).add(i, "days")
    //      const data = {
    //      name: this.eventName,
    //      start: Date.parse(`date ${this.timePickerStart}`),
    //      end: Date.parse(`date ${this.timePickerEnd}` ),
    //      time: true
    //   }
    //   送る用の関数
    //  }
    //   this.dialog = false
    // }
  }
}
</script>
