<template>
  <v-btn
    :disabled="disabled"
    @click="addTodo"
  >
    保存
  </v-btn>
</template>

<script>
export default {
  // 追加
  methods: {
    addTodo () {
      // selectedTodoが空、もしくはselected.statusがtrueの場合は追加、どちらかがfalseの場合は編集で追加
      if (this.selectedTodo.length === 0 || this.selectedTodo.status === false) {
        this.$store.commit('todos/add', this.itemText)
        this.itemText = ''
      } else {
        this.$store.commit('todos/edit', { todo: this.selectedTodo, content: this.itemText })
        this.itemText = ''
        this.$store.commit('todos/toggle', this.selectedTodo)
      }
    }
  }
}
</script>
