<template>
  <v-tabs
    v-if="loggedIn || guestLoggedIn"
    align-with-title
    fixed-tabs
    dark
  >
    <v-tab
      v-for="(item, i) in service"
      :key="i"
      :to="item.link"
      fixed-tabs
    >
      <v-icon>{{ item.icon }}</v-icon>
    </v-tab>
  </v-tabs>
</template>
<script>
export default {
  data () {
    return {
      service: [
        { icon: 'mdi-magnify', link: '/search' },
        { icon: 'mdi-bookshelf', link: '/registeredBook' },
        { icon: 'mdi-calendar', link: '/schedule' }
      ]
    }
  },

  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },

    guestLoggedIn () {
      return JSON.parse(sessionStorage.getItem('guestLoginFlag'))
    }
  }
}
</script>
<style lang="scss" scoped>
  @media only screen and (max-width:550px) {
    .v-tab {
      margin: 0!important;
    }
  }
</style>
