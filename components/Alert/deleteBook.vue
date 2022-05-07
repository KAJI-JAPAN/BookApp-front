<template>
  <v-alert
    type="info"
    :value="alert"
    dense
    class="alert"
    min-width="200px"
  >
    削除しました。
  </v-alert>
</template>
<script>
import '@/assets/css/alert.scss'

export default {
  data () {
    return {
      alert: true
    }
  },
  created () {
    setTimeout(() => {
      this.alert = false
    }, 4000)
  }
}
</script>
