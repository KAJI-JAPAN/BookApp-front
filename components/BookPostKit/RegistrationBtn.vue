<template>
  <v-row
    justify="center"
    class="ma-5"
  >
    <v-btn
      color="success"
      class="ma-2"
      :disabled="disabled"
      @click="post"
    >
      登録する
    </v-btn>
    <v-btn
      class="ma-2"
      depressed
      :disabled="disabled"
      @click="clearBook()"
    >
      やめる
    </v-btn>
  </v-row>
</template>
<script>
export default {
  computed: {
    selectedBook () {
      return this.$store.state.book.selectedBook
    },
    disabled () {
      return this.selectedBook === null
    }
  },
  methods: {
    // 書籍の選択の解除
    clearBook () {
      this.$store.commit('book/clearBook')
    },

    // 書籍を送る
    post () {
      this.$store.dispatch('post')
    }
  }
}
</script>
