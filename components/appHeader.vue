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
    <AppTitleDrawer
      :drawer.sync="drawer"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
