<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="setName"
        prepend-icon="mdi-account"
        label="ニックネーム"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['name'],
  auth: false,
  computed: {
    setName: {
      get () { return this.name },
      set (newVal) { return this.$emit('update:name', newVal) }
    }
  }

}
</script>
