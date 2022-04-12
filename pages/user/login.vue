<template>
  <div class="mt-3">
    <v-card class="pa-7 ma-10 mx-auto" max-width="600">
      <div class="login-logo">
        <img
          :src="logoImg"
          width="70px"
        >
      </div>
      <v-form ref="form">
        <v-container>
          <UserFormTitle>
            KOUDOKUにログイン
          </UserFormTitle>

          <UserFormTextFieldEmail :email.sync="userInfo.email" />
          <UserFormTextFieldPassword :password.sync="userInfo.password" />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                @click="login"
              >
                ログイン
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
      userInfo: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async login () {
      await this.$auth.loginWith('local', {
        data: {
          email: this.userInfo.email,
          password: this.userInfo.password
        }
      })
        .then(
          (response) => {
            // レスポンスで返ってきた、認証に必要な情報をlocalStorageに保存
            localStorage.setItem('access-token', response.headers['access-token'])
            localStorage.setItem('client', response.headers.client)
            localStorage.setItem('uid', response.headers.uid)
            localStorage.setItem('token-type', response.headers['token-type'])
            return response
          },
          (error) => {
            return error
          }
        )
    }
  }
}
</script>

<style>
  .login-logo {
    text-align: center;
  }
</style>
