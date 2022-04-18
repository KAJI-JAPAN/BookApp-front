<template>
  <div class="mt-3">
    <AlertSuccess>
      登録に成功しました
    </AlertSuccess>
    <AlertError>
      登録に失敗しました
    </AlertError>
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
            KOUDOKUをはじめよう！
          </UserFormTitle>

          <UserFormTextFieldUserName :name.sync="userInfo.name" />
          <UserFormTextFieldEmail :email.sync="userInfo.email" :error.sync="errorMessage" />
          <p class="error-message">{{ errorMessage }}</p>
          <UserFormTextFieldPassword :password.sync="userInfo.password" />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                :disabled="!isValid || loading"
                :loading="loading"
                block
                class="white--text"
                color="deep-purple lighten-1"
                @click="signup"
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
      loading: false,
      isValid: false,
      logoImg,
      show: false,
      userInfo: {
        name: '',
        email: '',
        password: ''
      },
      errorMessage:''
    }
  },
  methods: {
    signup () {
      this.$axios.post('/api/v1/auth', this.userInfo)
      .then((response) => {
        this.loading = true
        this.$store.commit('alertSwitchSuccess', true)
        setTimeout(() => {
          this.$store.commit('alertSwitchSuccess', false)
          this.$router.replace(`/user/login`)
        }, 2000)
      })
      .catch((e) => {
        this.loading = true
        this.$store.commit('alertSwitchError', true)
        this.errorMessage = e.response.data.errors.full_messages.toString()
        setTimeout(() => {
          this.$store.commit('alertSwitchError', false)
          this.loading = false
        }, 2000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 12px;
  text-align: center;
}
</style>