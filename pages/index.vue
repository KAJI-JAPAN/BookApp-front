<template>
  <v-app>
    <div class="back">
      <v-container class="mt-10">
        <!-- トップタイトル -->
        <TopPageTitle />

        <v-sheet
          class="rounded-xl pa-15 ma-auto"
          max-width="1200px"
        >
          <!-- サービス紹介シート -->
          <TopPageService />
          <v-divider class="pa-5" />
        </v-sheet>
      </v-container>
    </div>
  </v-app>
</template>
<script>
export default {
  auth: false
}

</script>
<style lang="scss" scoped>
  .back {
    background: rgb(145, 145, 253);
    height: 100%;
  }
</style>
