<template>
  <div class="mt-3">
    <AlertError>
      ログインに失敗しました
    </AlertError>
    <AlertLogout>
      ログアウトしました
    </AlertLogout>
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
                :disabled="!isValid || loading"
                :loading="loading"
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
      loading: false,
      isValid: false,
      logoImg,
      userInfo: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    const logoutAlert = JSON.parse(localStorage.getItem('logoutAlert'))
    if (logoutAlert) {
      this.$store.commit('alertSwitchLogout', true)
      setTimeout(() => {
        this.$store.commit('alertSwitchLogout', false)
        localStorage.removeItem('logoutAlert')
      }, 3000)
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
        .then((response) => {
          let loginAlert = { loginFlag: true }
          localStorage.setItem('loginAlert', JSON.stringify(loginAlert))
          this.loading = true
          this.$store.commit('alertSwitchSuccess', true)
          setTimeout (() => {
            this.loading = false
            this.$router.replace(`/user/${response.data.data.id}`
          )}, 2000)
        })
        .catch((e) => {
          this.loading = true
          this.$store.commit('alertSwitchError', true)
          setTimeout(() => {
            this.loading = false
            this.$store.commit('alertSwitchError', false)
          }, 2000)
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
