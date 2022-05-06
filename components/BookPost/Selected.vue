<template>
  <v-container>
    <!-- 選択されたデータの表示 -->
    <v-card
      width="900px"
      min-height="400px"
      class="mx-auto my-8 pa-3 rounded-xl"
    >
      <div style="height:100%;">
        <v-card-subtitle v-if="selectedBook == null">
          登録したい書籍を検索してください
        </v-card-subtitle>
        <template v-if="selectedBook != null">
          <v-row style="text-align:center;">
            <v-col cols="6" class="pa-5">
              <img :src="image(selectedBook)">
            </v-col>
            <v-col cols="4" class="pa-5">
              <v-card-title>{{ title(selectedBook) }}</v-card-title>
              <v-card-subtitle class="pa-3">
                {{ author(selectedBook) }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </template>
      </div>
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
        <BookPostKitButtonRegistrationCancelBtn />
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  computed: {
    selectedBook () {
      return this.$store.state.book.selectedBook
    }
  },
  // plugin/bookInfo  title,author,image
  methods: {
    title (value) {
      return this.$title(value)
    },
    author (value) {
      return this.$author(value)
    },
    image (value) {
      return this.$image(value)
    }
  }
}
</script>
<style scoped>
img {
  height: 120px;
}
</style>
