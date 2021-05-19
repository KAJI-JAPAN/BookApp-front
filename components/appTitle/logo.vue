<template>
  <v-img
    :src="logoImg"
    alt="logoImg"
    width="200px"
  >
  </v-img>
</template>

<script>
import logoImg from '~/assets/images/book-app.png'
export default {
  data: () => ({
    logoImg
  })
}
</script>
