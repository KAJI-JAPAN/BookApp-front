<template>
  <v-row justify="center">
    <div style="width: 700px; height: 100px;">
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
          :disabled="disabled"
          :valid="disabled"
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
                <v-card-subtitle>{{ author(book) }}</v-card-subtitle>
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
</template>
<script>
export default {
  data ({ $config: { BOOK_URL } }) {
    return {
      keyword: '',
      dialog: false,
      BOOK_URL
    }
  },

  computed: {
    books () {
      return this.$store.state.book.books
    },
    disabled () {
      return this.keyword.length === 0
    }
  },

  methods: {
    // plugin/bookInfo  title,author,image
    title (value) {
      return this.$title(value)
    },
    author (value) {
      return this.$author(value)
    },
    image (value) {
      return this.$image(value)
    },

    // 本の選択
    select (book) {
      this.$store.commit('book/selectedBook', book)
      this.dialog = false
    },

    get () {
      if (this.keyword.length !== 0) {
        this.$axios.get(this.BOOK_URL + this.keyword + '&maxResults=15')
          .then((response) => {
            this.$store.commit('book/getBooks', response)
          })
      }
    }
  }
}
</script>
