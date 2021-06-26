<template>
  <v-container>
    <v-row class="pa-5 pb-7">
      <h1>{{ APP_NAME }}では以下のサービスが利用できます</h1>
    </v-row>
    <v-row>
      <v-col
        v-for="(card,i) in serviceCards"
        :key="`card-${i}`"
      >
        <v-card :height="cardHeight">
          <v-layout justify-center>
            <v-avatar
              :size="avatarSize"
            >
              <v-img
                :src="require(`~/assets/images/${card.image}`)"
                alt="Avatar"
              />
            </v-avatar>
          </v-layout>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text> {{ card.text }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ボタン -->
    <div class="text-center ma-10 pa-5">
      <v-btn
        color="primary"
        class="pa-7"
        width="50%"
        x-large
        elevation="2"
      >
        さっそく使う
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME,
      avatarSize: '200px',
      cardHeight: '350px',
      serviceCards: [
        { title: '書籍管理機能', text: '自分が読んだ本を管理することができます', image: 'home-book.png' },
        { title: '行動を登録', text: '本を読んでからのアクションを登録することができます', image: 'home-action.png' },
        { title: 'シェア機能', text: '本の内容のまとめやアクションをフォロワーにシェアすることができます', image: 'home-share.png' }
      ]
    }
  }
}
</script>
