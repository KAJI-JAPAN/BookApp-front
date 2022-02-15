<template>
  <div>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedElement: null,
      selectedOpen: false,
      selectedEvent: {},
      menu: false,
      eventName: ''
    }
  },

  methods: {
    // 年を取得
    getYear (tms) {
      return new Date(tms).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' })
    },

    // ミリ秒を変換する
    convertTime (tms) {
      return new Date(tms).toLocaleString('ja-JP', { hour: 'numeric', minute: 'numeric' })
    },

    deleteEvent () {
      this.selectedEvent = {}
      this.selectedOpen = false
    },
    changeColor (color) {
      this.selectedEvent.color = color
    },
    newEvent () {
      this.selectedEvent.name = this.eventName
      this.selectedOpen = false
    }
  }
}
</script>
