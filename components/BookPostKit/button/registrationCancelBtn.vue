<template>
  <v-btn
    class="ma-2"
    depressed
    :disabled="disabled"
    @click="clearBook()"
  >
    やめる
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
    // 書籍の選択の解除
    clearBook () {
      this.$store.commit('book/clearBook')
    }
  }
}
</script>
