<template>
  <v-alert
    :value="alert"
    dense
    class="alert"
    color="blue-grey"
    dark
    type="success"
  >
    <slot />
  </v-alert>
</template>
<script>
import '@/assets/css/alert.scss'

export default {
  computed: {
    alert () {
      return this.$store.state.alertLogout
    }
  }
}
</script>
