<template>
  <v-row>
    <v-col>
      <h1 class="koudoku-app">
        行動×本  KOUDOKUでは本で学んだ知識の活用をサポートします。
      </h1>
      <div class="mt-6">
        読んだ本の内容と、その後のアクションをみんなにシェアして知識を行動に移しましょう！
      </div>
      <v-divider />
      <v-col
        class="pl-0 mt-10"
      >
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
    <div class="img">
      <v-img
        :src="require('@/assets/images/home.png')"
        contain
      />
    </div>
  </v-row>
</template>

<script>
export default {
  methods: {
    guest () {
      this.$store.dispatch('guest/guestLogin')
    }
  }
}
</script>

<style lang="scss"  scoped>
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

  .img {
    min-width: 200px;
    max-width: 40%;
  }
  @media screen and (max-width: 600px) {
    .img {
      display: none;
    }
}
</style>
