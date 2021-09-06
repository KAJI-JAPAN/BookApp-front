<template>
  <v-btn
    color="success"
    class="ma-3"
    @click="update"
  >
    変更を保存する
  </v-btn>
</template>
<script>
export default {
  methods: {
    // 書籍を送る
    update () {
      this.$store.dispatch('update')
    }
  }
}
</script>
