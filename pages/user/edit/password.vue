<template>
  <div class="mt-3">
    <AlertSuccess>
      送信しました
    </AlertSuccess>
    <v-card class="ma-10 mx-auto" max-width="600">
      <v-toolbar
        color="deep-purple accent-4"
        dark
        class="mb-3"
      >
        <v-toolbar-title>パスワード再設定</v-toolbar-title>
      </v-toolbar>
      <div class="login-logo" />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <v-container>
          <UserFormTextFieldEmail :email.sync="email" />
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn
                block
                class="mr-4 blue white--text"
                :disabled="!isValid || loading"
                :loading="loading"
                @click="editEmail"
              >
                送信する
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
export default {
  data () {
    return {
      isValid: false,
      loading: false,
      email: ''
    }
  },
  methods: {
    editEmail () {
      this.$axios
        .$post('/api/v1/auth/passwords', {
          user: {
            email: this.email
          }

        }, {
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
