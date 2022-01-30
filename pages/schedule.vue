<template>
  <div>
    <v-sheet tile height="6vh" color="grey lighten-3" class="d-flex align-center">
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="100vh">
      <v-calendar
        ref="calendar"
        :events="events"
        :event-color="getEventColor"
        @change="getEvents"
        v-model="value"
      />
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    events: []
  }),
  methods: {
    getEvents () {
      const events = [
        {
          name: '会議',
          start: new Date('2022-01-22T01:00:00'), // 開始時刻
          end: new Date('2022-01-22-T02:00:00'), // 終了時刻
          color: 'blue',
          timed: false // 終日ならfalse
        }
      ]
      this.events = events
    },
    getEventColor (event) {
      return event.color
    }
  }
}
</script>
