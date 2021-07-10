<template>
  <v-container>
    <!-- 選択されたデータの表示 -->
    <v-card
      width="900px"
      min-height="400px"
      class="mx-auto my-8 pa-3 rounded-xl"
    >
      <div style="height:100px;">
        <v-card-subtitle v-if="selectedBook == null">
          登録したい書籍を検索してください
        </v-card-subtitle>
        <template v-if="selectedBook != null">
          <v-row style="text-align:center;">
            <v-col cols="6" class="pa-5">
              <img :src="image(selectedBook)">
            </v-col>
            <v-col cols="4" class="pa-5">
              <v-card-title>{{ title(selectedBook) }}</v-card-title>
              <v-card-subtitle class="pa-3">
                {{ author(selectedBook) }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </template>
      </div>
      <BookPostText />
      <v-divider
        class="ma-7"
      />
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
    </v-card>
  </v-container>
</template>
<script>
import bookInfo from '~/plugins/bookInfo.js'
export default {
  mixins: [bookInfo],
  data () {
    return {
    }
  },
  computed: {
    selectedBook () {
      return this.$store.state.selectedBook
    },
    disabled () {
      return this.selectedBook === null
    }
  },

  methods: {
    // 本の選択の解除
    clearBook () {
      this.$store.commit('clearBook')
    },

    post () {
      const postAxios = this.$axios.$post
      const url = '/api/v1/'

      // ユーザーが選択した本をサーバーに送る
      postAxios(url + 'posts', {
        post: {
          title: this.title(this.selectedBook),
          author: this.author(this.selectedBook),
          image: this.image(this.selectedBook)
        }
      })
        .then((responsebook) => {
          this.$store.commit('userBook', responsebook)
        })

      // ユーザーが入力したテキストをサーバーに送る
      postAxios(url + 'posts_item', {
        postotems: {
          userText1: {
            label: '',
            text: ''
          },
          userText2: {
            label: '',
            text: ''
          },
          userText3: {
            label: '',
            text: ''
          }
        }
      })
        .then((responesText) => {
          this.store.commit('getText', responesText)
        })
    }
  }
}
</script>
<style scoped>
img {
  height: 120px;
}
</style>
