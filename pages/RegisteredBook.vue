<template>
  <div
    class="back ma-3"
  >
    <v-sheet
      max-width="1100px"
      min-height="200px"
      class="mx-auto"
      tile
    >
      <RegisteredBookTitle />
      <v-divider />
      <RegisteredBookMain />
    </v-sheet>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated'
}
</script>
