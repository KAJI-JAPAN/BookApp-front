<template>
  <v-app-bar
    app
    dense
    elevation="1"
    color="blue-grey darken-4"
    clipped
    clipped-right
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <AppTitleLogo />
    </nuxt-link>
    <v-spacer />
    <AppTitleMenu />
    <slot name="drawer-menu" />
  </v-app-bar>
</template>
<script>
export default {
}
</script>
