<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="setEmail"
        type="text"
        label="Eメールアドレス"
        prepend-icon="mdi-email"
        :rules="rules"
      />
      <p class="caption mb-0" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['email'],

  data () {
    return {
      rules: [
        v => !!v || '',
        v => /.+@.+\..+/.test(v) || ''
      ]
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
