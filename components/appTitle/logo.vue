<template>
  <v-img
    :src="logoImg"
    alt="logoImg"
    width="200px"
  />
</template>

<script>
import logoImg from '~/assets/images/book-app.png'
export default {
  data () {
    return {
      logoImg
    }
  }
}
</script>
