<template>
  <v-app>
    <div
      class="teal lighten-1 background pa-10"
    >
      <div class="alert-success">
        <AlertEditSuccess />
      </div>
      <div class="alert-error">
        <AlertError />
      </div>
      <div class="alert-delete">
        <AlertDeleteText />
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

  // // アラート用
  // computed: {
  //   responseBook () {
  //     return this.$store.state.book.responseBook
  //   }
  // },

  // 登録した本(selectedBook)と習慣化リストの取得
  // mounted () {
  //   this.$axios.$get(url.POST_API + 'posts/' + this.$route.params.id)
  //     .then((response) => {
  //       this.$store.commit('book/selectedBook', response.post)
  //       this.$store.commit('todos/regissterdList', response.content)
  //     })
  // },

  asyncData (context) {
    console.log(context)
  },
  fetch ({ store, $axios, route }) {
    return $axios.$get(url.POST_API + 'posts/' + route.params.id)
      .then((response) => {
        store.commit('book/selectedBook', response.post)
        store.commit('todos/regissterdList', response.content)
      })
  }

  // async fetch ({ store, params }) {
  //   const { data } = await axios.get(url.POST_API + 'posts/' + this.$route.params.id)
  //   store.commit('book/selectedBook', data.post)
  //   store.commit('todos/regissterdList', data.content)
  // }
}
</script>
