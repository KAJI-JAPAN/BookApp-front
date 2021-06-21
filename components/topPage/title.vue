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
      <v-col class="pl-0 mt-10">
        <v-btn
          class="mr-5"
          x-large
          rounded
        >
          <v-icon
            color="primary"
            class="ma-2"
          >
            mdi-twitter
          </v-icon>
          Twitterでログイン
        </v-btn>
        <v-btn
          x-large
          rounded
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
export default {
}
</script>

<style lang="scss">
  *{
    text-transform: none !important;
  }

  .koudoku-app {
    color: white;
  }
</style>
