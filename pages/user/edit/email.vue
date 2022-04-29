<template>
  <div class="mt-3">
    <AlertSuccess>
      変更を保存しました
    </AlertSuccess>
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
            メールアドレスを変更する
          </UserFormTitle>

          <UserFormTextFieldEmail :email.sync="userInfo.email" />
          <UserFormTextFieldPassword :password.sync="userInfo.password" />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                :disabled="!isValid || loading"
                :loading="loading"
                @click="editEmail"
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
  data () {
    return {
      isValid: false,
      loading: false,
      logoImg,
      userInfo: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    editEmail () {
      this.$axios
        .$patch('api/v1/auth', this.userInfo, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client')
          }
        })
        .then(() => {
          this.$store.commit('alertSwitchSuccess', true)
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.$store.commit('alertSwitchSuccess', false)
            this.$router.push('/user/edit/setting')
          }, 2000)
        })
    }
  }
}
</script>
