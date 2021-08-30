<template>
  <nuxt-child />
</template>
<script>
export default {
  async middleware (params) {
    return await this.$store.dispatch('getRegisteredBook', params)
  },
  validate () {
    return !!this.$store.state.book.selectedRegisteredBook
  }
}
</script>
