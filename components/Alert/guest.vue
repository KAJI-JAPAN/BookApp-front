<template>
  <v-alert
    type="success"
    :value="alert"
    dense
    class="alert"
  >
    <slot />
  </v-alert>
</template>
<script>
import '@/assets/css/alert.scss'

export default {
  computed: {
    alert () {
      return this.$store.state.alertGuest
    }
  }
}
</script>
