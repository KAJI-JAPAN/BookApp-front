<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1>新規登録</h1>
        <!-- 入力フォーム -->
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormEmail
            :email.sync="params.user.email"
          />
          <UserFormPassword
            :password.sync="params.user.password"
          />
          <UserFormConfirmationPassword
            :password-confirmation.sync="params.user.user.password_cpnfirmation"
          />
          <UserFormBtn>
            <v-btn
              color="light-green darken-1"
              class="white--text"
              :loding="loading"
              @click="signup"
            >
              新規登録
            </v-btn>
          </UserFormBtn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'App',
  auth: false,
  data () {
    return {
      loading: false,
      params: { user: { password: '', email: '', pasword_confirmation: '' } }
    }
  },
  methods: {
    signup () {
      this.loading = true
      setTimeout(() => {
        this.formReset()
        this.loading = false
      }, 1500)
    },
    formReset () {
      this.$refs.form.reset()
      this.params = { user: { name: '', email: '', password: '' } }
    }
  }
}
</script>
