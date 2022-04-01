<template>
  <!-- 登録した本を表示 -->
  <div class="selected_book">
    <div v-if="scheduleBook">
      <nuxt-link
        :to="`/book/${scheduleBook.id}`"
        class="link"
      >
        <v-row class="ma-5">
          <v-col>
            <img :src="scheduleBook.image">
          </v-col>
          <v-col cols="" class="pa-5">
            <v-card-text>{{ scheduleBook.title }}</v-card-text>
            <v-card-subtitle class="pa-5">
              {{ scheduleBook.author }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </nuxt-link>
    </div>
    <div v-else>
      <nuxt-link
        to="/registeredBook"
        class="link"
      >
        <v-row
          justify="center"
          class="ma-4"
          @click="getBook"
        >
          <v-chip
            class="ma-5 pa-8"
            x-large
            color="grey lighten-3"
          >
            <v-icon class="ma-1">
              mdi-plus
            </v-icon>
            本を登録する
          </v-chip>
        </v-row>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import '@/assets/css/schedule.scss'
export default {
  computed: {
    scheduleBook () {
      return this.$store.state.book.scheduleBook
    }
  },

  methods: {
    getBook () {
      this.$store.commit('schedule/cancelEvent')
      if (!this.summarizeBookSelectedSchedule) { this.$store.commit('schedule/switchBookSelectedSchedule', true) }
      this.$router.push('/registeredBook')
    }
  }
}
</script>
