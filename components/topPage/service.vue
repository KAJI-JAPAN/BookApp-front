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
        <TopPageShare />
    </v-row>

    <!-- ボタン -->
    <div class="text-center ma-10 pa-5">
      <v-btn
        color="primary"
        class="pa-7"
        width="50%"
        x-large
        elevation="2"
        @click="guest"
      >
        さっそく使う
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import * as url from '@/store/constants/url'

export default {
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME,
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
    async guest () {
      await this.$axios.$post(`${url.POST_API}guests`)
        .then((res) => {
          let loginAlert = { loginAlert: true }
          let guestLoginFlag = { guestLoginFlag: true }
          localStorage.setItem('loginAlert', JSON.stringify(loginAlert))
          sessionStorage.setItem('guestLoginFlag', JSON.stringify(guestLoginFlag))
          this.$auth.loginWith('local', { 
            data:  {
              email: res.email,
              password: res.password,
              guest: true
            }
          })
          this.$router.replace('/search')
        })
    }
  }
}
</script>
