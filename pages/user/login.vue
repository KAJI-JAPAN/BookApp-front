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
          <v-row justify="center">
            <p cols="12" class="ma-8 display-1 grey--text">
              KOUDOKUにログイン
            </p>
          </v-row>
          <UserFormTextFieledEmail />
          <UserFormTextFieledPassword />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                @click="loginWithAuthModule"
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
      logoImg,
      password: 'password',
      email: 'momoko@test.xom',
      show: false
    }
  },

  computed: {
  },
  methods: {
    async loginWithAuthModule () {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
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
