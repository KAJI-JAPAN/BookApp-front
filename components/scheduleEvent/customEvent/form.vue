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
      dialog: false
    }
  },

  methods: {

  }
}
</script>
