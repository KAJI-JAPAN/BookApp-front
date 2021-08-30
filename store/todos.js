export const state = () => ({
  list: [],
  hidden: false
})

export const mutations = {
  // テキスト追加 編集状態じゃない場合は status: false
  add (state, content) {
    state.list.push({
      content,
      status: false
    })
  },

  // 削除
  remove (state, todo) {
    state.list.splice(state.list.indexOf(todo), 1)
  },

  // 編集を反映
  edit (state, { todo, content }) {
    state.list.splice(state.list.indexOf(todo), 1, { content })
  },

  // 編集判断フラグ
  toggle (state, todo) {
    todo.status = !todo.status
  },

  // 編集状態をキャンセル
  cancel (state, todo) {
    todo.status = false
  },

  // アクション登録パネルフラグ
  switching (state) {
    state.hidden = !state.hidden
  },

  clear (state) {
    state.list = []
  },

  regissterdListAdd (state, response) {
    state.list = response
  }
}
