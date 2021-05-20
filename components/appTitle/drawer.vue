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
        link
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
  props: {
    drawer: {
      type: Boolean,
      default: null
    }
  },
  data: () => ({
    items: [
      { title: 'home', icon: 'mdi-home', color: 'green' },
      { title: 'twitter', icon: 'mdi-twitter', color: 'cyan darken-2' },
      { title: 'gest', icon: 'mdi-account-circle', color: '' },
      { title: 'help', icon: 'mdi-help-circle', color: 'amber accent-4' }
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
