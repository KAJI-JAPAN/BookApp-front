<template>
  <v-container>
    <v-row style="text-align:center;">
      <v-col cols="6" class="pa-5">
        <img :src="selectedBook.image">
      </v-col>
      <v-col cols="4" class="pa-5">
        <v-card-title>{{ selectedBook.title }}</v-card-title>
        <v-card-subtitle class="pa-3">
          {{ selectedBook.author }}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <!-- 習慣化データの入力 -->
    <BookPostText />
    <v-divider
      class="ma-7"
    />
    <v-row
      justify="center"
      class="ma-5"
    >
      <BookPostKitButtonRegistrationBtn />
      <BookPostKitButtonRegistrationDeleteBtn />
    </v-row>
  </v-container>
</template>
<script>

export default {
  computed: {
    selectedBook () {
      return this.$store.state.book.selectedBook
    }
  }
}
</script>
