<template>
  <div>
    <h2 class="text-center ma-5">
      習慣化サポート
    </h2>
    <v-row
      v-for="(suport, i) in suports"
      :key="`suport-${i}`"
      class="ma-5"
    >
      <v-col class="cols-5">
        <h3> {{ suport.title }} </h3>
        <v-card-text class="ma-3">
          {{ suport.text }}
        </v-card-text>
        <v-chip
          label
          class="ma-5"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          {{ suport.keyword }}
        </v-chip>
      </v-col>
      <v-col class="cols-5">
        <v-img
          :src="require(`~/assets/images/${suport.image}`)"
          width="500px"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      suports: [
        {
          title: '記録',
          text: '登録した書籍を確認することができます。同じ画面から本の要点や行動リストを確認できます。新しい習慣を始めるにあったっては普段の生活の10%を変えることが目安と言われています。一度に登録できるアクションは2つまです。無理のない範囲で習慣化を目指しましょう。',
          image: 'memo.png',
          keyword: 'スモールステップ'
        },
        {
          title: '宣言',
          text: 'SNSを使って本のまとめとその後のアクションをシェアすることで習慣化へ繋がります。これは習慣化のテクニックとしてもよく使われています。フォロワーに宣言する事でサボりがちな自分を監視する仕組みとも言えます。',
          image: 'speach.png',
          keyword: '責任感'
        }
      ]
    }
  }
}
</script>
