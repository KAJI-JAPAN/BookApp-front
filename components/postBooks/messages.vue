<template>
  <v-container>
    <v-divider class="mb-3" />
    <v-row class="ma-3" justify="space-around">
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
      name="input-7-1"
      filled
      label="習慣化1"
      placeholder="(例) 運動は集中力を高めるので、いつもより10分早起きしてランニングをする"
      auto-grow
      color="pink lighten-3"
    />
    <v-text-field
      name="input-7-1"
      filled
      label="習慣化2"
      auto-grow
      placeholder="(例) 毎朝7時から瞑想を行う"
      color="pink lighten-3"
      clearable
    />
    <v-text-field
      name="input-7-1"
      filled
      label="習慣化3"
      auto-grow
    />
  </v-container>
</template>
<script>
export default {
}
</script>
