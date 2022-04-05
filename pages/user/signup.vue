<template>
  <div class="mt-3">
    <v-card class="pa-7 ma-10 mx-auto" max-width="600">
      <div class="login-logo">
        <img
          :src="logoImg"
          width="70px"
        >
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row justify="center">
            <p cols="12" class="ma-8 display-1 grey--text">
              KOUDOKUをはじめよう！
            </p>
          </v-row>
          <UserFormTextFieledEmail />
          <UserFormTextFieledPassword />

          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field
                v-model="passwordConfirmation"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                label="パスワード確認"
                :type="show ? 'text' : 'password'"
                @click:append="show= !show"
              />
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field
                v-model="name"
                prepend-icon="mdi-account"
                label="ニックネーム"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                @click="registerUser"
              >
                登録する
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import logoImg from '~/assets/images/login_logo.png'
export default {
  auth: false,
  data () {
    return {
      logoImg,
      passwordConfirmation: '',
      show: false,
      name: ''
    }
  },
  methods: {
    registerUser () {
      this.$axios.post('/api/v1/auth', this.user).then((response) => {
        window.location.href = '/users/comfirmation'
      })
    }
  }
}
</script>
