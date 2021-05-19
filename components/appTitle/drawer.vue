<template>
  <v-navigation-drawer
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
      >
        <v-list-item-icon
        >
          <v-icon
          v-text="item.icon"
          color="light-green"
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
      >
        <v-list-item-content>
          <v-list-item-title>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'KOUDOKUとは', icon: 'mdi-home' },
      { title: 'Twitterでログインする', icon: 'mdi-twitter' },
      { title: 'ゲストでログイン', icon: 'mdi-account-circle' },
      { title: 'アプリの使い方', icon: 'mdi-white-balance-incandescent' }
    ]
  })
}
</script>
<style scoped>
.drawer {
  background-image:url("~/assets/images/drawer-back.png");
}
</style>
