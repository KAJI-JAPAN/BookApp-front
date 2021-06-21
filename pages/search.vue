<template>
  <div class="teal lighten-1 background pa-10">
    <v-sheet
      width="1100px"
      class="mx-auto pa-5 rounded-xl"
      color="grey lighten-5"
    >
      <v-row justify="center">
        <div style="width: 700px;">
          <v-text-field
            v-model="keyword"
            type="text"
            label="本を探す"
            outlined
            class="ma-10"
          />
        </div>
        <v-dialog
          v-model="dialog"
          max-width="650px"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              x-large
              class="mt-12"
              v-on="on"
              @click="get"
            >
              <v-icon x-large>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
          <v-container>
            <v-card>
              <v-card
                v-for="book in books"
                :key="book.id"
                class="mx-auto rounded-xl"
                max-width="600px"
                @click="select(book)"
              >
                <div class="d-flex flex-row mb-3 pa-5">
                  <img :src="image(book)">
                  <div>
                    <v-card-title>{{ title(book) }}</v-card-title>
                    <v-card-subtitle>{{ authors(book) }}</v-card-subtitle>
                  </div>
                </div>
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
            </v-card>
          </v-container>
        </v-dialog>
      </v-row>
      <v-divider class="ma-7" />
      <!-- 選択されたデータの表示 -->
      <v-card width="900px" class="mx-auto">
        <template v-if="selectedBook != null">
          <v-row style="text-align:center;">
            <v-col cols="6">
              <img :src="image(selectedBook)">
            </v-col>
            <v-col cols="4">
              <v-card-title>{{ title(selectedBook) }}</v-card-title>
              <v-card-subtitle>{{ authors(selectedBook) }}</v-card-subtitle>
              <v-btn
                class="success"
              >
                登録する
              </v-btn>
              <v-btn
                class="ma-2"
                text
                @click="clearBook()"
              >
                やめる
              </v-btn>
            </v-col>
          </v-row>
          <BookPostText />
        </template>
      </v-card>
    </v-sheet>
  </div>
</template>
<script>
import noImage from '~/assets/images/noImage.png'

export default {
  data () {
    return {
      keyword: '',
      dialog: false,
      url: 'https://www.googleapis.com/books/v1/volumes?q=',
      disbled: false
    }
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    selectedBook () {
      return this.$store.state.selectedBook
    }
  },

  methods: {
    // 本の選択
    select (book) {
      this.$store.commit('setBook', book)
      this.dialog = false
    },
    // 本の選択の解除
    clearBook () {
      this.selectedBook = null
    },
    get () {
      this.$axios.get(this.url + this.keyword + '&maxResults=15')
        .then((res) => {
          this.$store.commit('getBooks', res)
        })
    },
    // 取得した書籍データの設定
    title: valu => valu.volumeInfo.title ? valu.volumeInfo.title : 'No title',
    authors: valu => valu.volumeInfo.authors ? valu.volumeInfo.authors[0] : 'No authors',
    image: valu => valu.volumeInfo.imageLinks ? valu.volumeInfo.imageLinks.thumbnail : noImage
  }
}
</script>

<style lang="scss" scoped>
  .background {
    background-image: url('~/assets/images/tree.png');
    background-repeat: space repeat;
  }
</style>
