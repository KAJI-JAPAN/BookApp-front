<template>
  <v-container>
    <v-row style="text-align:center;">
      <v-col md="6" sm="6" class="pa-5">
        <img :src="selectedBook.image">
      </v-col>
      <v-col md="6" sm="6" class="pa-5 pt-14">
        <h3>{{ selectedBook.title }}</h3>
        <v-card-subtitle class="pa-3">
          {{ selectedBook.author }}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <!-- 習慣化データの入力 -->
    <RegisteredBookUpdateText />
    <v-divider
      class="ma-7"
    />
    <v-row
      justify="center"
      class="ma-5"
    >
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
