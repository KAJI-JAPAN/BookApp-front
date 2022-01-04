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
        <!--登録された本の表示 -->
        <RegisteredBookEdit />
      </v-sheet>
    </div>
  </v-app>
</template>
<script>
import * as url from '@/store/constants/url'
export default {

  // アラート用
  computed: {
    responseBook () {
      return this.$store.state.book.responseBook
    }
  },

  // Get selectedBook
  mounted () {
    this.$axios.$get(url.POST_API + 'posts/' + this.$route.params.id)
      .then((response) => {
        this.$store.commit('book/selectedBook', response.post)
        this.$store.commit('todos/regissterdListAdd', response.content)
        console.log(this.$store.state.todos.list)
      })
  }
}
</script>
