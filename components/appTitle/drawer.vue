<template>
  <v-navigation-drawer
    app
    mobile-breakpoint="960"
    clipped
    right
    class="drawer"
    v-model="setDrawer"
  >
    <v-list>
      <!-- ナビメニュー -->
      <v-list-item
        v-for="(item, i) in items"
        :key="`nav-${i}`"
        :to="item.link"
      >
        <v-list-item-icon
        >
          <v-icon
          :color="item.color"
          v-text="item.icon"
          />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ $t(`drawer.${item.title}`) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- ナビメニュー -->
      <v-list-item
        target="_blank"
      >
      </v-list-item>
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
  data: () => ({
    items: [
      { title: 'home', icon: 'mdi-home', color: 'green', link: '/concept' },
      { title: 'twitter', icon: 'mdi-twitter', color: 'cyan darken-2', link: '' },
      { title: 'gest', icon: 'mdi-account-circle', link: '' },
      { title: 'help', icon: 'mdi-help-circle', color: 'amber accent-4', link: '/help' }
    ]
  }),
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
