<template>
  <v-container>
    <v-row class=" pa-5 pb-7">
      <h1>KOUDOKUでは以下のサービスが利用できます</h1>
    </v-row>
    <v-row>
      <v-col
        v-for="(card,i) in serviceCards"
        :key="`card-${i}`"
        :xs="tabletSize"
        :sm="tabletSize"
        :md="desktopSize"
        :lg="desktopSize"
      >
        <v-card
          :height="cardHeight"
          min-width="320px"
        >
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

    <div class="text-center ma-5 ml-0 pa-5">
      <v-btn
        color="primary"
        class="guest-btn pa-7"
        width="50%"
        x-large
        elevation="2"
        min-width="180px"
        @click="guest"
      >
        さっそく使う
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tabletSize: '12',
      desktopSize: '4',
      avatarSize: '200px',
      cardHeight: '350px',
      serviceCards: [
        { title: '書籍管理機能', text: '自分が読んだ本を管理することができます', image: 'home-book.png' },
        { title: '行動を登録', text: '本を読んでからのアクションを登録することができます', image: 'home-action.png' },
        { title: '行動を管理', text: '本を読んでからのアクションをカレンダー機能を利用して管理できます', image: 'home-calendar.png' }
        // { title: 'シェア機能', text: '本の内容のまとめやアクションをフォロワーにシェアすることができます', image: 'home-share.png' }
      ]
    }
  },

  methods: {
    guest () {
      this.$store.dispatch('guest/guestLogin')
    }
  }
}
</script>
<style lang="scss" scoped>
  @media screen and (max-width: 500px) {
    .box {
      padding: 0;
      margin: 0;
      .guest-btn {
        width: 500px;
        padding: 100%;
      }
    }
}
</style>
