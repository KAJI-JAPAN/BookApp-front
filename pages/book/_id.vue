<template>
  <v-app>
    <div
      class="teal lighten-1 background pa-10"
    >
      <div v-if="selectedRegisteredBook === 'OK'">
        <AlertSuccess />
      </div>
      <div v-else-if="selectedRegisteredBook === 'ERROR'">
        <AlertError />
      </div>
      <v-sheet
        width="1100px"
        class="mx-auto pa-5 rounded-xl"
        color="grey lighten-5"
        min-height="500px"
      >
        <!-- 選択されたデータの表示 -->
        <RegisteredBookEdit />
      </v-sheet>
    </div>
  </v-app>
</template>
<script>
import * as url from '@/store/constants/url'
export default {
  computed: {
    selectedRegisteredBook () {
      return this.$store.state.book.selectedRegisteredBook
    }
  },
  // 選択した本を表示
  mounted () {
    this.$axios.$get(url.POST_API + 'posts/' + this.$route.params.id)
      .then((response) => {
        this.$store.commit('book/selectedRegisteredBook', response.post)
        this.$store.commit('todos/regissterdListAdd', response.content)
        // console.log(this.$store.state.todos.list)
        // console.log(response.content[0])
        // console.log(response)
      })
  }
}
</script>
