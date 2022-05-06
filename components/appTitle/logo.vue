<template>
  <div>
    <div class="pc">
      <v-img
        :src="logoImg"
        alt="logoImg"
        width="150px"
      />
    </div>
    <div class="sp">
      <v-img
        :src="logo"
        alt="logo"
        width="40px"
      />
    </div>
  </div>
</template>

<script>
import logoImg from '~/assets/images/book-app.png'
import logo from '~/assets/images/book-app-logo.png'
export default {
  data () {
    return {
      logoImg,
      logo
    }
  }
}
</script>
<style lang="scss" scoped>
    @media only screen and (max-width:550px) {
      .pc {
        display: none;
      }
    }
    @media only screen and (min-width:550px) {
    .sp {
      display: none;
    }
  }
</style>
