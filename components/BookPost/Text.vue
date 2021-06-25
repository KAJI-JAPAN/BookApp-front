<template>
  <v-container>
    <v-row class="ma-10">
      <v-divider />
    </v-row>
    <v-row
      v-show="hidden == false"
      class="pa-10"
    >
      <v-chip
        color="pink"
        class="mx-auto"
        outlined
        large
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
        <div
          v-for="(text,index) in texts"
          :key="index"
        >
          <v-text-field
            filled
            :label="text.label"
            :placeholder="text. placeholeder"
            :color="text.color"
            auto-grow
          />
        </div>
        <div class="text-center">
          <v-btn
            small
            color="primary"
            outlined
            @click="hidden=!hidden"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-expand-transition>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      hidden: false,
      texts: [
        {
          label: '習慣化1',
          placeholeder: '(例) 運動は集中力を高めるので、いつもより10分早起きしてランニングをする',
          color: 'pink lighten-3'
        },
        {
          label: '習慣化2',
          placeholeder: '(例) 毎朝7時から瞑想を行う',
          color: 'pink lighten-3'
        },
        {
          label: '習慣化3'
        }
      ]
    }
  }
}
</script>
