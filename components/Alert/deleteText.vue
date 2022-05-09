<template>
  <v-alert
    type="success"
    :value="alert"
    dense
    class="alert"
    min-width="200px"
  >
    <slot />
  </v-alert>
</template>
<script>
import '@/assets/css/alert.scss'

export default {
  computed: {
    alert () {
      return this.$store.state.alertDelete
    }
  }
}
</script>
<style lang="scss" scoped>
    .v-alert {
    max-width: 200px;
  }
</style>
