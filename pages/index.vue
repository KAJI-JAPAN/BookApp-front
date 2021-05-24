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
          <TopPageConcept />
          <v-divider class="pb-5" />
        <!-- 習慣化サポート -->
          <TopPageSaport />

        </v-sheet>
      </v-container>
    </div>
  </v-app>
</template>
<script>
export default {
}

</script>
<style lang="scss" scoped>
  .back {
    background: rgb(145, 145, 253);
    height: 100%;
  }
</style>
