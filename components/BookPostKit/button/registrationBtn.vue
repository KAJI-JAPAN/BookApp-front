<template>
  <v-btn
    color="success"
    class="ma-3"
    :disabled="disabled"
    @click="post"
  >
    登録する
  </v-btn>
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
    // 書籍を送る
    post () {
      this.$store.dispatch('post')
    }
  }
}
</script>
