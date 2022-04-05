<template>
  <v-row justify="center">
    <v-col cols="12" md="10" sm="10">
      <v-text-field
        v-model="password"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        label="パスワード"
        :type="show ? 'text' : 'password'"
        @click:append="show= !show"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      password: 'password',
      show: false
    }
  }
}
</script>
