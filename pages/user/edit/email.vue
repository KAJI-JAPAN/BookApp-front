<template>
  <div class="mt-3">
    <AlertSuccess>
      変更を保存しました
    </AlertSuccess>
    <AlertError>
      そのメールアドレスには変更できません
    </AlertError>
    <v-card class="ma-10 mx-auto" max-width="600">
      <v-toolbar
        color="deep-purple accent-4"
        dark
        class="mb-3"
      >
        <v-toolbar-title>新しいメールアドレスをを入力</v-toolbar-title>
      </v-toolbar>
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
import * as url from '@/store/constants/url'
export default {
  data () {
    return {
      isValid: false,
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
  methods: {
    editEmail () {
      this.$axios
        .$patch(`${url.POST_API}auth`, this.userInfo, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client')
          }
        })
        .then(() => {
          this.$formSuccessHandling('/user/edit/setting')
        })
        .catch(() => {
          this.$formErrorHandling()
        })
    }
  }
}
</script>
