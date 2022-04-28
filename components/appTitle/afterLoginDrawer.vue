<template>
  <v-navigation-drawer
    v-model="setDrawer"
    app
    mobile-breakpoint="960"
    clipped
    right
    class="drawer"
  >
    <v-list>
      <!-- ナビメニュー -->
      <v-list-item
        v-for="(item, i) in items"
        :key="`nav-${i}`"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon
            :color="item.color"
            v-text="item.icon"
          />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- ログアウト -->
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon
            v-text="'mdi-logout-variant'"
          />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            ログアウト
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        target="_blank"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import * as url from '@/store/constants/url'
export default {
  props: {
    drawer: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      items: [
        { title: 'KODOKUとは', icon: 'mdi-home', color: 'green', link: '/description' },
        { title: 'Twitterで連携する', icon: 'mdi-twitter', color: 'cyan darken-2', link: '' },
        { title: 'アプリの使い方', icon: 'mdi-help-circle', color: 'amber accent-4', link: '/help' },
        { title: 'アカウント設定', icon: 'mdi-account-cog', color: '', link: 'user/setting' }
      ]
    }
  },

  // Vuetify ドロワー開閉用
  computed: {
    setDrawer: {
      get () { return this.drawer },
      set (val) { return this.$emit('update:drawer', val) }
    }
  },

  methods: {
    logout () {
      this.$auth.logout()
      this.$router.replace('/user/login')
      const logoutAlert = { logout: true }
      localStorage.setItem('logoutAlert', JSON.stringify(logoutAlert))
      const guestLoginFlag = JSON.parse(localStorage.getItem('guestLoginFlag'))
      console.log(guestLoginFlag)
      if (guestLoginFlag) {
        this.$axios.$delete(`${url.POST_API}auth`)
        console.log("削除リクエスト")
      }
    }
  }
}
</script>
<style scoped>
.drawer {
  background-image:url("~/assets/images/drawer-back.png");
}
</style>
