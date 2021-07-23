<template>
  <v-menu
    top
    rounded
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        class="mt-3"
        v-on="on"
      >
        <v-icon>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        link
      >
        <v-list-item-title @click="toEdit(todo)">
          <v-icon>mdi-pencil</v-icon>
          編集
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item
        link
      >
        <v-list-item-title @click="removeTodo(todo)">
          <v-icon>mdi-delete</v-icon>
          削除
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: '編集', icon: 'mdi-pencil' },
        { title: '削除', icon: 'mdi-delete' }
      ]

    }
  },
  methods: {
    toEdit (todo) {
      this.editIndex = true
      this.selectedTodo = todo
      this.itemText = todo.text
      this.$store.commit('todos/toggle', todo)
    },
    removeTodo (todo) {
      this.$store.commit('todos/remove', todo)
    }
  }
}
</script>
