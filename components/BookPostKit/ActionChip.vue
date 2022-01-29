<template>
  <v-row class="ma-2" justify="space-around">
    <v-col class="pa-0">
      <v-chip
        class="ma-3"
        color="red"
        text-color="white"
        icon="mdi-fire"
      >
        アクションを登録してみよう
        <v-icon>
          mdi-fire
        </v-icon>
      </v-chip>
    </v-col>
    <v-col align-selef="end">
      <BookPostKitHint />
    </v-col>
  </v-row>
</template>
<script>
export default {
}
</script>
