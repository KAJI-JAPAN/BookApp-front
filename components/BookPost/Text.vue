<template>
  <v-container>
    <v-row class="ma-10">
      <v-divider />
    </v-row>
    <BookPostKitTextRegistrationOpenBtn />
    <v-container
      v-show="hidden"
    >
      <BookPostKitActionChip />
      <v-row v-for="(todo,index) in todos" :key="index">
        <v-text-field
          filled
          readonly
          :value="todo.text"
          class="mr-2"
          auto-grow
        />
        <div v-if="todo.status === true">
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
              v-for="item in items"
              :key="item.text"
              link
              @click="callAction(item.action, todo)"
            >
              <v-list-item-title>
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
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
        <v-btn @click="cancel">
          キャンセル
        </v-btn>
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
        { title: '編集', icon: 'mdi-pencil', action: 'toEdit' },
        { title: '削除', icon: 'mdi-delete', action: 'removeTodo' }
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
      // postTextAddでRailsに送る
      if (this.selectedTodo.status === false) {
        this.$store.dispatch('todos/postTextAdd', this.itemText)
        this.itemText = ''
        console.log(this.todos)
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
    callAction (action, todo) {
      this[action](todo)
    },
    cancel () {
      this.$store.commit('todos/cancel', this.selectedTodo)
      this.itemText = ''
    }
  }
}
</script>
