<template>
  <v-text-field
    v-model="setEmail"
    prepend-icon="mdi-email"
    label="メールアドレス"
  />
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    }
  },
  computed: {
    setEmail: {
      get () { return this.email },
      set (newVal) { return this.$emit('update:email', newVal) }
    }
  }
}
</script>
