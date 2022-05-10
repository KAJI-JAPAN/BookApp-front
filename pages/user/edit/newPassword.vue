<template>
  <div class="mt-3">
    <AlertSuccess>
      変更しました
    </AlertSuccess>
    <v-card class="ma-10 mx-auto" max-width="600">
      <v-toolbar
        color="deep-purple accent-4"
        dark
        class="mb-3"
      >
        <v-toolbar-title>新しいパスワードを入力</v-toolbar-title>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="isValid"
      >
        <v-container>
          <UserFormTextFieldPassword :password.sync="userInfo.password" />
          <UserFormTextFieldPasswordConfirmation
            :password-confirmation.sync="userInfo.passwordConfirmation"
            :password="userInfo.password"
          />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                :disabled="!isValid || loading"
                :loading="loading"
                @click="updatePassword"
              >
                保存する
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import * as url from '@/store/constants/url'
import '@/assets/css/user-form.scss'
export default {
  data () {
    return {
      isValid: false,
      userInfo: {
        password: '',
        passwordConfirmation: ''
      }
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    }
  },

  methods: {
    updatePassword () {
      this.$axios
        .$put(`${url.POST_API}auth/passwords`, {
          user: {
            password: this.userInfo.password,
            password_confirmation: this.userInfo.passwordConfirmation,
            reset_password_token: this.$route.query.token
          }
        },
        {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client')
          }
        })
        .then(() => {
           this.$formSuccessHandling('/user/edit/setting')
        })
    }
  }
}
</script>
