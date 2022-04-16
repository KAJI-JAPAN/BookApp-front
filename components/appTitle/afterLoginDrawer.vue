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
      <!-- ナビメニュー -->
      <v-list-item
        target="_blank"
      />
      <!-- ログアウト用 -->
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Use Google's location service?
            </v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Disagree
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!--  -->
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
        { title: 'Twitterで連携する', icon: 'mdi-twitter', color: 'cyan darken-2', link: '' },
        { title: 'アプリの使い方', icon: 'mdi-help-circle', color: 'amber accent-4', link: '/help' },
        { title: 'アカウント設定', icon: 'mdi-account-cog', color: '', link: 'user/setting' },
        { title: 'ログアウト', icon: 'mdi-logout-variant', color: '', link: 'user/logout' }
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
