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
          <UserFormTitle>
            アカウント編集
          </UserFormTitle>

          <UserFormTextFieldUserName :name.sync="userInfo.name" />
          <UserFormTextFieldEmail :email.sync="userInfo.email" />
          <UserFormTextFieldPassword :password.sync="userInfo.password" />
          <UserFormTextFieldPsaaeordConfirmation :password-confirmation.sync="userInfo.passwordConfirmation" />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                @click="registerUser"
              >
                保村する
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
      userInfo: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    editEmail () {
      this.$axios
        .put('api/v1/auth', this.userInfo, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client')
          }
        })
        .then((response) => {
          localStorage.setItem('access-token', response.headers['access-token'])
          localStorage.setItem('client', response.headers.client)
          localStorage.setItem('uid', response.headers.uid)
          localStorage.setItem('token-type', response.headers['token-type'])
          window.location.href = '/'
        })
    }
  }
}
</script>
