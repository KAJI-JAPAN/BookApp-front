<template>
  <v-row
    v-show="hidden == false"
    class="pa-10"
  >
    <v-chip
      color="pink"
      class="mx-auto"
      outlined
      large
      @click="hiddenAction"
    >
      <v-icon>mdi-plus</v-icon>
      アクションを登録する
    </v-chip>
  </v-row>
</template>
<script>
export default {
  computed: {
    hidden () {
      return this.$store.state.todos.hidden
    }
  },
  methods: {
    hiddenAction () {
      this.$store.commit('todos/switching')
    }
  }
}
</script>
