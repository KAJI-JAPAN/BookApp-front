<template>
  <v-container class="back">
    <v-pagination
      v-if="lists.length !==0"
      v-model="page"
      :length="length"
      circle
      @input="pageChange"
    />
    <div
      v-if="lists.length === 0"
      class="text-center"
    >
      <p class="pa-13">
        登録している書籍はありません
      </p>
    </div>
    <div v-else>
      <v-row class="ma-3">
        <v-col
          v-for="(book, index) in displayLists"
          :key="index"
          cols="12"
          class="ma-1"
        >
          <v-card
            :to="`/book/${book.id}`"
            hover
            class="ma-1"
          >
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
        </v-col>
      </v-row>
    </div>
    <v-pagination
      v-if="lists.length !==0"
      v-model="page"
      :length="length"
      circle
      @input="pageChange"
    />
  </v-container>
</template>
<script>
import * as url from '@/store/constants/url'
export default {
  data () {
    return {
      page: 1,
      length: 0,
      lists: [],
      displayLists: [],
      pageSize: 10
    }
  },

  // 登録した書籍情報を取得
  // ページネーションを設定
  mounted () {
    this.$axios.$get(url.POST_API + 'posts')
      .then((response) => {
        this.lists = response
        this.length = Math.ceil(this.lists.length / this.pageSize)
        this.displayLists = this.lists.slice(0, this.pageSize)
      })
  },

  // ページネーションクリック時に要素を取得
  methods: {
    pageChange (pageNumber) {
      this.displayLists = this.lists.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber))
    }
  }
}
</script>
