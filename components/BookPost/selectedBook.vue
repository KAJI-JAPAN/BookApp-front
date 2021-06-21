<template>
  <v-container>
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
  </v-container>
</template>
<script>
import noImage from '~/assets/images/noImage.png'

export default {
  data () {
    return {
      disbled: false
    }
  },
  computed: {
    userBooks () {
      return this.$store.state.selectedBook
    }
  },

  methods: {
    // 本の選択の解除
    clearBook () {
      this.$store.state.selectedBook = null
    },
    title: valu => valu.volumeInfo.title ? valu.volumeInfo.title : 'No title',
    authors: valu => valu.volumeInfo.authors ? valu.volumeInfo.authors[0] : 'No authors',
    image: valu => valu.volumeInfo.imageLinks ? valu.volumeInfo.imageLinks.thumbnail : noImage
  }
}
</script>
