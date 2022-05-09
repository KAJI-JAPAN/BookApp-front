<template>
  <v-container class="back">
    <v-card class="pa-6 ma-3">
      <div align="center">
        <h1 class="pa-4">
          アプリの使い方
        </h1>
      </div>
      <h2>1.読んだ本を探す</h2>
      <v-divider class="pa-3" />
      <div align="start">
        <v-card-text>
          <p>検索ボックスから読んだ本を探して、その後のアクションを入力しましょうアクションは出来るだけ具体的に、少なくしましょう。</p>
          <p>普段の生活をほんの少しだけ変えるぐらいがおすすめです。</p>
        </v-card-text>
        <div align="center">
          <video controls>

            <source
              src="~/assets/images/search.mp4"
              type="video/webm"
            >

            <source
              src="~/assets/images/search.mp4"
              type="video/mp4"
            >

            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      </div>
      <div>
        <h2 class="mt-15">
          2.読んだ本を管理する
        </h2>
        <v-divider class="pa-3" />
        <v-card-text>自分がどんな本を読んだか一目で確認できます。</v-card-text>
        <v-img :src="require(`~/assets/images/book-list.png`)" />
      </div>
      <div>
        <h2 class="mt-15">
          3.読んだ本から得た知識を習慣化する
        </h2>
        <v-divider class="pa-3" />
        <v-card-text>本から得た知識を習慣化するためのサポートをします。いつ行うかカレンダーに記載して習慣化を目指しましょう！</v-card-text>
        <div align="center">
          <video controls>

            <source
              src="~/assets/images/schedule.mp4"
              type="video/webm"
            >

            <source
              src="~/assets/images/schedule.mp4"
              type="video/mp4"
            >

            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<style lang="scss" scoped>
  video {
    max-width: 90%;
  }
</style>
