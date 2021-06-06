<template>
  <v-text-field
    v-model="setPasswordConfirmation"
    prepend-icon="mdi-lock"
    append-icon="mdi-eye-off"
    label="パスワード確認"
  />
</template>

<script>
export default {
  props: {
    passwordonfirmation: {
      type: String,
      default: ''
    }
  },
  computed: {
    setPasswordConfirmation: {
      get () { return this.passwordConfirmation },
      set (newVal) { return this.$emit('upadate:confirmationPassword', newVal) }
    }
  }
}
</script>
