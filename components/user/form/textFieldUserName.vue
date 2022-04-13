<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="setName"
        prepend-icon="mdi-account"
        label="ニックネーム"
        :rules="rules"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['name'],
  auth: false,
  data () {
    const max = 15
    return {
      rules: [
        v => !!v || '',
        v => (!!v && max >= v.length) || `${max}文字以内で入力してください`
      ]
    }
  },

  computed: {
    setName: {
      get () { return this.name },
      set (newVal) { return this.$emit('update:name', newVal) }
    }
  }

}
</script>
