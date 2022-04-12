<template>
  <div class="back">
    <v-container>
      <!-- トップタイトル -->
      <v-sheet
        class="rounded-xl pa-10 ma-auto"
        max-width="1200px"
      >
        <TopPageConcept />
        <v-divider class="pb-5" />
        <!-- 習慣化サポート -->
        <TopPageSaport />
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
export default {
  auth: false
}
</script>
