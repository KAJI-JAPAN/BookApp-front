<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>
<script>
export default {
  middleware: 'authenticated'
}
</script>
