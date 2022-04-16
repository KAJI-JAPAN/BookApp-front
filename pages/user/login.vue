<template>
  <div class="mt-3">
    <v-card class="pa-7 ma-10 mx-auto" max-width="600">
      <div class="login-logo">
        <img
          :src="logoImg"
          width="70px"
        >
      </div>
      <v-form
        ref="form"
        v-model="isValid"
      >
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
  middleware: 'loginPageControl',
  auth: false,
  data () {
    return {
      isValid: false,
      loading: false,
      logoImg,
      userInfo: {
        email: '',
        password: ''
      }
      // email: '',
      // password: ''
    }
  },

  methods: {
    // login () {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.$store.dispatch('login')
    //     this.$router.replace('/')
    //     this.loading = false
    //   }, 1500)
    // }

    async login () {
      await this.$auth.loginWith('local', {
        data: {
          email: this.userInfo.email,
          password: this.userInfo.password
        }
      })
        .then((response) => {
          this.$store.commit('user/setLoggedIn', true)
          this.$router.replace(`/user/${response.data.data.id}`)  
          return response
        },
        (error) => {
          return error
        })
    }
  }
}
</script>

<style>
  .login-logo {
    text-align: center;
  }
</style>
