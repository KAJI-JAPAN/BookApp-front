<template>
  <v-container>
    <v-row class="ma-10">
      <v-divider />
    </v-row>
    <BookPostKitButtonTextRegistrationOpenBtn />
    <v-container
      v-show="hidden"
    >
      <BookPostKitActionChip />
      <v-row v-for="(todo, index) in list" :key="index">
        <v-text-field
          filled
          readonly
          :value="todo.content"
          class="mr-2"
          auto-grow
        />
        <div v-if="todo.status === true">
          <BookPostKitEditIcon />
        </div>
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
        label="入力してみよう！"
        placeholder="(例) 朝の運動は１日の集中力を上げる効果があるので毎朝10分早起きしてランニングをする"
      />
      <v-row>
        <v-col>
          <v-btn @click="cancel">
            キャンセル
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            :disabled="disabled"
            class="updateTextBtn"
            @click="addTodo"
          >
            保存
          </v-btn>
        </v-col>
      </v-row>
      <BookPostKitButtonTextRegistrationCloseBtn />
    </v-container>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      itemText: '',
      items: [
        { title: '編集', icon: 'mdi-pencil', action: 'toEdit' },
        { title: '削除', icon: 'mdi-delete', action: 'removeTodo' },
        { title: 'カレンダーに登録する', icon: 'mdi-calendar', action: 'moveSchedule' }
      ]
    }
  },
  computed: {
    ...mapState('todos', ['list', 'disabled', 'hidden', 'selectedTodo']),

    selectedBook () {
      return this.$store.state.book.selectedBook
    }
  },

  methods: {

    // 習慣化テキストを追加
    addTodo () {
      // selectedTodoが空、もしくはselectedTodo.statusがtrueの場合は追加、どちらかがfalseの場合は編集で追加
      if (this.selectedTodo.length === 0 || this.selectedTodo.status !== true) {
        this.$store.dispatch('todos/add', this.itemText)
        this.itemText = ''
      } else {
        // selectedTodoのIDを編集対象の習慣化テキストを把握するために使う
        this.$store.dispatch('todos/update', { itemText: this.itemText, selectedTodo: this.selectedTodo })
        this.$store.commit('todos/toggle', this.selectedTodo)
        this.itemText = ''
      }
    },

    // アクション編集
    toEdit (todo) {
      this.$store.commit('todos/setSelectedTodo', todo)
      this.itemText = todo.content
      this.$store.commit('todos/toggle', todo)
    },
    // アクション削除
    removeTodo (todo) {
      this.$store.dispatch('todos/delete', todo)
    },
    // v-onの繰り返し処理用
    callAction (action, todo) {
      this[action](todo)
    },
    // キャンセルボタン
    cancel () {
      this.$store.commit('todos/cancel', this.selectedTodo)
      this.itemText = ''
    },
    // カレンダーに移動、選択した書籍とアクションを保存
    moveSchedule (todo) {
      this.$router.push('/schedule')
      this.$store.commit('todos/setSelectedTodo', todo)
      this.$store.commit('book/setScheduleBook', this.selectedBook)
    }
  }
}
</script>
