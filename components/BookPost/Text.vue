<template>
  <v-container>
    <v-row class="ma-10">
      <v-divider />
    </v-row>
    <BookPostKitTextRegistrationOpenBtn />
    <v-container
      v-show="hidden"
    >
      <!-- <template #extension>
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
      </template> -->
      <BookPostKitActionChip />
      <v-row v-for="(todo,index) in todos" :key="index">
        <v-text-field
          filled
          readonly
          :value="todo.text"
          class="mr-2"
          auto-grow
        />
        <div v-if="todo.done === true">
          <BookPostKitEditIcon />
        </div>
        <!-- <div v-else>
          <BookPostKitChangeTextBtn />
        </div> -->
        <v-menu
          v-else
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
              @click="toEdit(todo)"
            >
              <v-list-item-title>
                <v-icon>mdi-pencil</v-icon>
                編集
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item
              link
              @click="removeTodo(todo)"
            >
              <v-list-item-title>
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
        label="習慣化"
        placeholder="(例) 朝の運動は１日の集中力を上げる効果があるので毎朝10分早起きしてランニングをする"
      />
      <v-row>
        <v-col>
          <v-btn
            :disabled="disabled"
            @click="addTodo"
          >
            保存
          </v-btn>
        </v-col>
        <v-co>
          <v-btn @click="cancel">
            キャンセル
          </v-btn>
        </v-co>
      </v-row>
      <BookPostKitTextRegistrationCloseBtn />
    </v-container>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
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
    },
    hidden () {
      return this.$store.state.todos.hidden
    }
  },

  methods: {
    addTodo () {
      if (this.selectedTodo.done === false) {
        this.$store.commit('todos/add', this.itemText)
        this.itemText = ''
      } else {
        this.$store.commit('todos/edit', { todo: this.selectedTodo, text: this.itemText })
        this.itemText = ''
        this.$store.commit('todos/toggle', this.selectedTodo)
      }
    },
    toEdit (todo) {
      this.selectedTodo = todo
      this.itemText = todo.text
      this.$store.commit('todos/toggle', todo)
    },
    removeTodo (todo) {
      this.$store.commit('todos/remove', todo)
    },
    cancel () {
      this.$store.commit('todos/cancel', this.selectedTodo)
      this.itemText = ''
    }
  }
}
</script>
