<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="email"
        label="Eメールアドレス"
        prepend-icon="mdi-email"
      />
      <p class="caption mb-0" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      email: 'momoko@test.xom'
    }
  }
}
</script>
