<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="setPasswordConfirmation"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        label="パスワードを再入力"
        :rules="form.rules"
        :type="show ? 'text' : 'password'"
        @click:append="show= !show"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['passwordConfirmation'],
  data () {
    return {
      show: false,
      getPassword: ''
    }
  },
  computed: {
    setPasswordConfirmation: {
      get () { return this.email },
      set (newVal) { return this.$emit('update:password-confirmation', newVal) }
    }
  }
}
</script>
