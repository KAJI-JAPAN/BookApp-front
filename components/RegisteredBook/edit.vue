<template>
  <v-container>
    <v-row style="text-align:center;">
      <v-col cols="6" class="pa-5">
        <img :src="selectedRegisteredBook.image">
      </v-col>
      <v-col cols="4" class="pa-5">
        <v-card-title>{{ selectedRegisteredBook.title }}</v-card-title>
        <v-card-subtitle class="pa-3">
          {{ selectedRegisteredBook.author }}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <!-- 習慣化データの入力 -->
    <BookPostText />
    <v-divider
      class="ma-7"
    />
    <BookPostKitRegistrationBtn />
  </v-container>
</template>
<script>
// import * as url from '@/store/constants/url'
export default {
  computed: {
    selectedRegisteredBook () {
      return this.$store.state.book.selectedRegisteredBook
    }
  }
}
</script>
