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
      <v-row v-for="(todo,index) in todos" :key="index">
        <v-text-field
          filled
          readonly
          :value="todo.text"
          class="ma-3"
          auto-grow
        />
        <v-menu
          top
          rounded
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              class="mt-6"
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
      </v-row>

      <v-text-field
        v-model="itemText"
        filled
        color="pink lighten-3"
        auto-grow
      />
      <v-btn
        :disabled="disabled"
        @click="addTodo"
      >
        保存
      </v-btn>

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
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      editIndex: false,
      hidden: false,
      itemText: '',
      selectedTodo: [],
      items: [
        { title: '編集', icon: 'mdi-pencil' },
        { title: '削除', icon: 'mdi-delete' }
      ]
    }
  },

  computed: {
    todos () {
      return this.$store.state.todos.list
    },
    disabled () {
      return this.itemText.length === 0
    }
  },

  methods: {
    addTodo () {
      if (this.editIndex === false) {
        this.$store.commit('todos/add', this.itemText)
        this.itemText = ''
        console.log(this.todos)
      } else {
        this.$store.commit('todos/edit', { todo: this.selectedTodo, text: this.itemText })
        this.itemText = ''
        this.editIndex = false
        console.log(this.todos)
      }
    },
    toEdit (todo) {
      this.editIndex = true
      this.selectedTodo = this.todo
      this.itemText = todo.text
    },
    removeTodo (todo) {
      this.$store.commit('todos/remove', todo)
    }
  }
}
</script>
