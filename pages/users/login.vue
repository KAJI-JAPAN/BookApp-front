<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">
          ログイン
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormEmail
            :email.sync="params.auth.email"
          />
          <UserFormPassword
            :password.sync="params.auth.password"
          />
          <UserFormBtn>
            <v-btn
              color="light-green darken-1"
              class="white--text"
              @click="login"
            >
              ログイン
            </v-btn>
          </UserFormBtn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      params: { auth: { email: '', password: '' } }
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.$store.dispatch('login')
        this.$router.replace('/')
        this.loading = false
      }, 1500)
    }
  }
}
</script>
