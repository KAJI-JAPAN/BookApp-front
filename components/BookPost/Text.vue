<template>
  <v-main
    class="pa-5"
  >
    <v-divider />
    <v-row
      class="btn ma-4 mb-0"
    >
      <v-chip
        color="pink"
        class="mx-auto"
        outlined
        @click="hidden=!hidden"
      >
        <v-icon>mdi-plus</v-icon>
        アクションを登録する
      </v-chip>
    </v-row>
    <v-expand-transition>
      <v-container
        v-show="hidden"
      >
        <template #extension>
          <v-fab-transition>
            <v-btn
              color="pink"
              fab
              dark
              small
              absolute
              bottom
              left
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <v-row class="ma-2" justify="space-around">
          <v-col class="pa-0">
            <v-chip
              class="ma-3"
              color="red"
              text-color="white"
              icon="mdi-fire"
            >
              アクション
              <v-icon>
                mdi-fire
              </v-icon>
            </v-chip>
          </v-col>
          <v-col align-selef="end">
            <UserKitHint />
          </v-col>
        </v-row>

        <v-text-field
          filled
          label="習慣化1"
          placeholder="(例) 運動は集中力を高めるので、いつもより10分早起きしてランニングをする"
          auto-grow
          color="pink lighten-3"
        />
        <v-text-field
          filled
          label="習慣化2"
          auto-grow
          placeholder="(例) 毎朝7時から瞑想を行う"
          color="pink lighten-3"
          clearable
        />
        <v-text-field
          filled
          label="習慣化3"
          auto-grow
        />
      </v-container>
    </v-expand-transition>
  </v-main>
</template>
<script>
export default {
  data () {
    return {
      hidden: false
    }
  }
}
</script>
