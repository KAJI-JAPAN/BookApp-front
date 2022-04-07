<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="setPassword"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        label="パスワード"
        :type="show ? 'text' : 'password'"
        :rules="rules"
        @click:append="show= !show"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['password'],
  data () {
    return {
      show: false,
      rules: []
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
