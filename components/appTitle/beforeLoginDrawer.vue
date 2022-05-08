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
      <v-list-item
        target="_blank"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
        { title: 'アカウント登録', icon: 'mdi-account-plus', color: 'deep-purple darken-1', link: '/user/signup' },
        { title: 'ログイン', icon: 'mdi-login', color: 'blue', link: '/user/login' },
        // { title: 'Twitterでログイン', icon: 'mdi-twitter', color: 'cyan darken-2', link: '' },
        { title: 'アプリの使い方', icon: 'mdi-help-circle', color: 'amber accent-4', link: '/help' }
      ]
    }
  },

  // Vuetify ドロワー開閉用
  computed: {
    setDrawer: {
      get () { return this.drawer },
      set (val) { return this.$emit('update:drawer', val) }
    }
  }
}
</script>
<style scoped>
.drawer {
  background-image:url("~/assets/images/drawer-back.png");
}
</style>
