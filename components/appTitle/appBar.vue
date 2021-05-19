<template>
   <v-app-bar
        app
        dense
        elevation="1"
        color="blue-grey darken-2"
        clipped
        clipped-right
      >
    <v-app-bar-title>
    <nuxt-link
        to="/"
        class="text-decoration-none"
    >
        <AppTitleLogo />
    </nuxt-link>
    </v-app-bar-title>
      <v-spacer />
    <slot name="drawer-menu" />
  </v-app-bar>
</template>
<script>
export default {
}
</script>
