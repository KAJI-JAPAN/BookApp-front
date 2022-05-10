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
  data () {
    return {
      // loading: false,
      isValid: false,
      logoImg,
      userInfo: {
        email: '',
        password: ''
      }
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
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
        .then(() => {
          const loginAlert = { loginFlag: true }
          localStorage.setItem('loginAlert', JSON.stringify(loginAlert))
          // ゲストログインフラグ削除
          const guestLoginFlag = JSON.parse(sessionStorage.getItem('guestLoginFlag'))
          if (guestLoginFlag) {
            sessionStorage.removeItem('guestLoginFlag')
          }
          this.$formSuccessHandling('/search')
        })
        .catch(() => {
          this.$formErrorHandling()
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
