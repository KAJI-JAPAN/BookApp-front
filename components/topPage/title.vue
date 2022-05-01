<template>
  <v-row>
    <v-col>
      <h1 class="koudoku-app">
        行動×本  {{ APP_NAME }}では本で学んだ知識の活用をサポートします。
      </h1>
      <div class="mt-6">
        読んだ本の内容と、その後のアクションをみんなにシェアして知識を行動に移しましょう！
      </div>
      <v-divider />
      <v-col class="pl-0 mt-10">
        <nuxt-link to="/user/signup" class="link">
          <v-btn
            class="mr-5"
            x-large
            rounded
            to="/user/signup"
          >
            新規登録
          </v-btn>
        </nuxt-link>
        <v-btn
          x-large
          rounded
          class="pa-2"
          @click="guest"
        >
          ゲストで使う
        </v-btn>
      </v-col>
    </v-col>
    <v-col
      align-center
      cols="5"
      class="mt-15"
    >
      <v-img
        :src="require('@/assets/images/home.png')"
        contain
      />
    </v-col>
  </v-row>
</template>

<script>
import * as url from '@/store/constants/url'
export default {
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME
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

<style lang="scss">
  *{
    text-transform: none !important;
  }
  .link:link, .link:visited, .link:active {
  text-decoration: none;
  color: rgb(56, 55, 55);
}
  .koudoku-app {
    color: white;
  }
</style>
