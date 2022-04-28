<template>
  <div>
    <AppBar>
      <template #drawer-menu>
        <v-app-bar-nav-icon
          color="white"
          @click="drawer = !drawer"
        />
      </template>
    </AppBar>
    <div v-if="loggedIn || guestLoggedIn">
      <AppTitleAfterLoginDrawer
        :drawer.sync="drawer"
      />
    </div>
    <div v-else>
      <AppTitleBeforeLoginDrawer
        :drawer.sync="drawer"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  },

  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },

    guestLoggedIn () {
      return JSON.parse(localStorage.getItem('loginFlag'))
    }
  }
}
</script>
