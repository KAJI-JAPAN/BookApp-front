<template>
  <v-tabs
    v-if="loggedIn || guestLoggedIn"
    align-with-title
    fixed-tabs
    dark
  >
    <v-tab
      fixed-tabs
      @click="searchRedirect"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-tab>
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
  },
  methods: {
    searchRedirect () {
      this.$store.commit('book/clearBook')
      this.$router.push('/search')
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
