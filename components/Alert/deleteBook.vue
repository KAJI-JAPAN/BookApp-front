<template>
  <v-alert
    type="info"
    :value="alert"
    dense
    class="alert"
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
    }, 2000)
  }
}
</script>
