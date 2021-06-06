<template>
  <v-text-field
    v-model="setPassword"
    prepend-icon="mdi-lock"
    append-icon="mdi-eye-off"
    label="パスワード"
  />
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    }
  },
  computed: {
    setPassword: {
      get () { return this.password },
      set (newVal) { return this.$emit('update:password', newVal) }
    }
  }
}
</script>
