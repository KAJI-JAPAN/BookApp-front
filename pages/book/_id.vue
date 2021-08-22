<template>
  <v-app>
    <div
      class="teal lighten-1 background pa-10"
    >
      <div v-if="responseBook === 'OK'">
        <AlertSuccess />
      </div>
      <div v-else-if="responseBook === 'ERROR'">
        <AlertError />
      </div>
      <v-sheet
        width="1100px"
        class="mx-auto pa-5 rounded-xl"
        color="grey lighten-5"
        min-height="500px"
      >
        <!-- 書籍検索、表示 -->
        <BookPostDialog />

        <!-- 選択されたデータの表示 -->
        <BookPostSelected />
      </v-sheet>
    </div>
  </v-app>
</template>
<script>
export default {
  computed: {
    responseBook () {
      return this.$store.state.book.responseBook
    }
  }
}
</script>
