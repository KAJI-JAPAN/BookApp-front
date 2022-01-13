<template>
  <v-alert
    type="success"
    :value="alert"
    dense
    class="alert"
  >
    保存しました
  </v-alert>
</template>
<script>
import '@/assets/css/alert.scss'

export default {
  computed: {
    alert () {
      return this.$store.state.alertEdit
    }
  }
}
</script>
