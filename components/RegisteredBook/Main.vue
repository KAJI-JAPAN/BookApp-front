<template>
  <v-container class="back">
    <div
      v-if="registeredBooks.length === 0"
      class="text-center"
    >
      <p class="pa-13">
        登録している書籍はありません
      </p>
    </div>
    <div v-else>
      <v-row class="ma-3">
        <v-col
          v-for="(book, index) in registeredBooks"
          :key="index"
          cols="12"
          class="pa-1"
        >
          <v-hover>
            <v-card to="/book/:id">
              <v-row>
                <v-col class="ml-2">
                  <img :src="book.image">
                </v-col>
                <div
                  class="ma-3 mt-13"
                  align="end"
                >
                  <v-card-title>{{ book.title }}</v-card-title>
                  <v-card-subtitle>{{ book.author }}</v-card-subtitle>
                </div>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import * as url from '@/store/constants/url'
export default {
  // storeから登録した書籍情報の配列を取得
  computed: {
    registeredBooks () {
      return this.$store.state.book.registeredBook
    }
  },

  // 登録した書籍情報を取得
  mounted () {
    this.$axios.$get(url.POST_API + 'posts')
      .then((response) => {
        this.$store.commit('book/registeredBook', response)
      })
  }
}
</script>
