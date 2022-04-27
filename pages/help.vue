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
    <v-row class="ma-3">
      <v-card>
        <v-card-title>読んだ本を探す</v-card-title>
        <v-card-text>
          検索ボックスから読んだ本を検索しましょう。
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  auth: false,
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME
    }
  }
}
</script>
