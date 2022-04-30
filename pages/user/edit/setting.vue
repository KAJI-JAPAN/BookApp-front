<template>
  <v-card
    class="mx-auto mt-5"
    width="500px"
  >
    <v-toolbar
      color="deep-purple accent-4"
      dark
      class="mb-3"
    >
      <v-icon>mdi-account-circle</v-icon>
      <v-toolbar-title>アカウント</v-toolbar-title>
    </v-toolbar>

    <!-- メール、パスワード編集 -->
    <v-list class="ma-1">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        class="ma-4"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-title v-text="item.title" />
      </v-list-item>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template #activator="{ on, attrs }">
          <v-list-item
            class="ma-4"
            v-bind="attrs"
            v-on="on"
          >
            <v-list-item-icon>
              <v-icon>mdi-heart-broken</v-icon>
            </v-list-item-icon>

            <v-list-item-title>アカウント削除</v-list-item-title>
          </v-list-item>
        </template>

        <v-card>
          <v-toolbar
            color="error"
            dark
          >
            本当に削除しますか？
          </v-toolbar>
          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              @click="deleteAccount"
            >
              削除
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              キャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      items: [
        { icon: 'mdi-email-edit', title: 'メールアドレスを変更する', link: '/user/edit/email' },
        { icon: 'mdi-key-variant', title: 'パスワードを変更する', link: '/user/edit/password' }
      ]
    }
  },

  methods: {
   deleteAccount () {
      this.$axios.$delete(`${url.POST_API}auth`)
      this.$store.commit('alertSwitchLogout')
      .then(() => {
        setTimeout(() => {
          this.$router.replace('/')
        }, 1500)
      })
    }
  }
}
</script>
