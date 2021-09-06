<template>
  <v-alert
    type="error"
    :value="alert"
    dense
    class="alert"
  >
    登録に失敗しました
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
