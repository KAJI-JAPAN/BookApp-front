<template>
  <v-main>
    <v-row justify="center">
      <div style="width: 700px;">
        <v-text-field
          v-model="keyword"
          type="text"
          label="本を探す"
          prepend-icon="mdi-magnify"
          outlined
        />
      </div>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        width="650px"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            :loading="dialog"
            x-large
            width="300px"
            class="ma-4"
            v-on="on"
            @click="get"
          >
            検索する
          </v-btn>
        </template>
        <v-container>
          <v-sheet>
            <v-card
              v-for="book in books"
              :key="book.id"
              class="ma-0"
              @click="select(book)"
            >
              <v-row>
                <v-cols class="my-4 ml-7">
                  <img :src="image(book)">
                </v-cols>
                <v-cols>
                  <v-card-title>{{ title(book) }}</v-card-title>
                  <v-card-text>{{ authors(book) }}</v-card-text>
                </v-cols>
              </v-row>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                閉じる
              </v-btn>
            </v-card-actions>
          </v-sheet>
        </v-container>
      </v-dialog>
    </v-row>
    <v-divider class="ma-5" />
    <!-- 選択されたデータの表示 -->
    <v-card width="1000px" class="mx-auto">
      <template v-if="selectedBook != null" justify="center">
        <v-row justify="center" style="text-align:center;">
          <v-col cols="4">
            <img :src="image(selectedBook)">
          </v-col>
          <v-col cols="4">
            <v-card-title>{{ title(selectedBook) }}</v-card-title>
            <v-card-text>{{ authors(selectedBook) }}</v-card-text>
            <v-btn class="ma-3">
              登録する
            </v-btn>
            <v-btn class="ma-2" @click="clearBook()">
              やめる
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-card>
    <!--  -->
  </v-main>
</template>
<script>
import noImage from '~/assets/images/noImage.png'

export default {
  data () {
    return {
      books: [],
      keyword: '',
      dialog: false,
      url: 'https://www.googleapis.com/books/v1/volumes?q=',
      selectedBook: null
    }
  },

  methods: {
    // 本の選択
    select (book) {
      this.selectedBook = book
    },
    // 本の選択の解除
    clearBook () {
      this.selectedBook = null
    },
    get () {
      this.$axios.get(this.url + this.keyword + '&maxResults=15')
        .then(this.setBooks).catch(this.setError)
    },
    // APIリクエスト後の処理
    setBooks (res) {
      this.books = res.data.items
    },
    // 取得した書籍データの設定
    title (valu) {
      return valu.volumeInfo.title ? valu.volumeInfo.title : 'No title'
    },
    authors (valu) { return valu.volumeInfo.authors ? valu.volumeInfo.authors : 'No authors' },
    image (valu) { return valu.volumeInfo.imageLinks ? valu.volumeInfo.imageLinks.thumbnail : noImage }
  }
}
</script>
