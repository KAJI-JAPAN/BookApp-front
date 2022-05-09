<template>
  <v-app>
    <div
      class="teal lighten-1 background py-5"
    >
      <div class="alert-success">
        <AlertGuest>
          ゲストでログインしました
        </AlertGuest>
        <AlertLogin>
          ログインしました
        </AlertLogin>
        <AlertSuccess>
          登録しました
        </AlertSuccess>
      </div>
      <div class="alert-error">
        <AlertError>
          登録に失敗しました。時間を置いてからお試しください
        </AlertError>
      </div>
      <v-sheet
        max-width="1100px"
        class="mx-auto pa-5 rounded-xl"
        color="grey lighten-5"
        min-height="600px"
      >
        <!-- 書籍検索、表示 -->
        <BookPostDialog />

        <!-- 選択されたデータの表示 -->
        <BookPostSelected />
      </v-sheet>
    </div>
  </v-app>
</template>
<script>
export default {
  middleware: 'authenticated',
  computed: {
    responseBook () {
      return this.$store.state.book.responseBook
    }
  },

  mounted () {
    const loginAlert = JSON.parse(localStorage.getItem('loginAlert'))
    const guestLoginAlert = JSON.parse(localStorage.getItem('guestLoginAlert'))
    // ゲストログイン時のアラート
    if (guestLoginAlert) {
      this.$store.commit('alertSwitchGuest', true)
      setTimeout(() => {
        this.$store.commit('alertSwitchGuest', false)
        localStorage.removeItem('guestLoginAlert')
      }, 2000)
      // ログイン時のアラート
    } else if (loginAlert) {
      this.$store.commit('alertSwitchLogin', true)
      setTimeout(() => {
        this.$store.commit('alertSwitchLogin', false)
        localStorage.removeItem('loginAlert')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .background {
    background-image: url('~/assets/images/tree.png');
    background-repeat: space repeat;
  }
</style>
