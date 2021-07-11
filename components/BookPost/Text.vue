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
        />
        <v-btn @click="removeTodo(todo)">
          削除
        </v-btn>
      </v-row>

      <v-text-field
        v-model="itemText"
        filled
        label="習慣化"
        placeholder="(例) 運動は集中力を高めるので、いつもより10分早起きしてランニングをする"
        color="pink lighten-3"
        auto-grow
        @keyup.enter="addTodo"
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
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      hidden: false,
      itemText: ''
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
      this.$store.commit('todos/add', this.itemText)
      this.itemText = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    removeTodo (todo) {
      this.$store.commit('todos/remove', todo)
    }
  }
}
</script>
