export const state = () => ({
  list: [],
  hidden: false
})

export const mutations = {
  // テキスト追加 編集状態じゃない場合はfalse
  add (state, text) {
    state.list.push({
      text,
      done: false
    })
  },

  // 削除
  remove (state, todo) {
    state.list.splice(state.list.indexOf(todo), 1)
  },

  // 編集を反映
  edit (state, { todo, text }) {
    state.list.splice(state.list.indexOf(todo), 1, { text })
  },

  // 編集判断フラグ
  toggle (state, todo) {
    todo.done = !todo.done
  },

  cancel (state, todo) {
    todo.done = false
  },
  switching (state) {
    state.hidden = !state.hidden
  }
}
