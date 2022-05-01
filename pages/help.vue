<template>
  <v-container class="back">
    <div align="center">
      <h1 class="pa-4">
        本で得た知識を習慣に落とし込もう
      </h1>
      <p>KOUDOKUでは本から得た知識を行動に移すためのサポートを行います。</p>
      <p>本を読んで終わるのではなく、知識を活かしてより豊かな人生を歩みましょう</p>
    </div>
    <v-divider class="pa-3" />
    <div
      v-for="(item, i) in helpItem"
      :key="i"
    >
      <h2>{{ item.title }}</h2>
      <p>{{ item.text }}</p>
      <v-img
        :src="require(`~/assets/images/${item.image}`)"
        alt="help"
      />
    </div>
    <!-- <div> -->
    <!-- <h2>読んだ本を管理する</h2>
      <p>読んだ本は一覧で管理することができます。</p>
      <v-img src="" />
    </div>
    <div>
      <h2>読んだ本から得た知識を習慣化する</h2>
      <p>本から得た知識を習慣化するためのサポートをします。</p>
      <v-img src="" /> -->
    <!-- </div> -->
  </v-container>
</template>
<script>
export default {
  auth: false,
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME,
      helpItem: [
        { title: '読んだ本を探す', text: '検索ボックスから読んだ本を検索しましょう。', image: '//' },
        { title: '読んだ本を管理する', text: '読んだ本は一覧で管理することができます。', image: 'book-list.png' },
        { title: '読んだ本から得た知識を習慣化する', text: '本から得た知識を習慣化するためのサポートをします。', image: '//' }

      ]
    }
  }
}
</script>
