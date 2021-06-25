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
                {{ authors(selectedBook) }}
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
        >
          登録する
        </v-btn>
        <v-btn
          class="ma-2"
          depressed
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
  computed: {
    selectedBook () {
      return this.$store.state.selectedBook
    }
  },

  methods: {
    // 本の選択の解除
    clearBook () {
      this.$store.commit('clearBook')
    }
  }
}
</script>
<style scoped>
img {
  height: 120px;
}
</style>
