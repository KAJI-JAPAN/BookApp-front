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
            KOUDOKUをはじめよう！
          </UserFormTitle>

          <UserFormTextFieldUserName :name.sync="userInfo.name" />
          <UserFormTextFieldEmail :email.sync="userInfo.email" />
          <UserFormTextFieldPassword :password.sync="userInfo.password" />
          <UserFormTextFieldPasswordConfirmation :password-confirmation.sync="userInfo.passwordConfirmation" />
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
import '@/assets/css/user-form.scss'
import logoImg from '~/assets/images/login_logo.png'
export default {
  auth: false,
  data () {
    return {
      logoImg,
      show: false,
      userInfo: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    registerUser () {
      this.$axios.$post('/api/v1/auth', this.userInfo).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
