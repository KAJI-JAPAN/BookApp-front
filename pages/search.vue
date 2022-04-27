<template>
  <v-app>
    <div
      class="teal lighten-1 background pa-10"
    >
      <div class="alert-success">
        <AlertGuest>
          ゲストでログインしました
        </AlertGuest>
        <AlertSuccess>
          登録しました
        </AlertSuccess>
      </div>
      <div class="alert-error">
        <AlertError>
          登録に失敗しました。時間を置いてからお試しください
          <AlertError />
        </alerterror>
      </div>
      <v-sheet
        width="1100px"
        class="mx-auto pa-5 rounded-xl"
        color="grey lighten-5"
        min-height="500px"
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
  // middleware: 'authenticated',
  data () {
    return {
      login: JSON.parse(localStorage.getItem('loginFlag'))
    }
  },
  computed: {
    responseBook () {
      return this.$store.state.book.responseBook
    }
  },

  mounted () {
    const loginAlert = JSON.parse(localStorage.getItem('loginAlert'))
    if (loginAlert) {
      this.$store.commit('alertSwitchGuest', true)
      setTimeout(() => {
        this.$store.commit('alertSwitchGuest', false)
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
