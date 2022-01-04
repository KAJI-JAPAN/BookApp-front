<template>
  <v-alert
    type="success"
    :value="alert"
    dense
    class="alert"
  >
    登録しました。
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
      location.reload()
    }, 3000)
  }
}
</script>
