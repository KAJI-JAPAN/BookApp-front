<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="setPasswordConfirmation"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        label="パスワードを再入力"
        :type="show ? 'text' : 'password'"
        :rules="rules"
        @click:append="show= !show"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['passwordConfirmation', 'password'],
  data () {
    return {
      show: false,
      rules: [
        v => (v === this.password) || 'パスワードが一致していません'
      ]
    }
  },
  computed: {
    setPasswordConfirmation: {
      get () { return this.passwordConfirmation },
      set (newVal) { return this.$emit('update:password-confirmation', newVal) }
    }
  }
}
</script>
