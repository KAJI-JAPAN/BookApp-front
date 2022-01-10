import * as url from './constants/url'

export const state = () => ({
  // 登録したテキスト
  list: [],
  hidden: false,
  responseAlert: null
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

  // リスト削除
  clear (state) {
    state.list = []
  },

  // アラート用レスポンス
  responseAdd (state, response) {
    state.responseAlert = response
  },

  // 登録済み習慣化リストをbook/_idで取得
  regissterdList (state, response) {
    state.list = response
  }
}

//  編集画面用TODO追加、編集
export const actions = {
  // 編集画面取得時にselectedBookは取得済みなのでIDは問題なし
  // $axios.$postで送るとパスパラメーターにIDを含むためエラーになる。$patchで送って編集追加
  // rootStateを経由するとstoreにある他のモジュールの値を参照可能
  add ({ rootState, commit }, itemText) {
    const selectedBook = rootState.book.selectedBook
    this.$axios.$patch(url.POST_API + 'post_items/' + selectedBook.id, {
      post: {
        content: itemText,
        status: false,
        post_id: selectedBook.id
      }
    })
      .then((response) => {
        commit('responseAdd', response)
      })
  },
  // 更新ようなので、selectedTodoで編集対象のIDを取得
  update ({ rootState, commit }, { itemText, selectedTodo }) {
    const selectedBook = rootState.book.selectedBook
    this.$axios.$patch(url.POST_API + 'post_items/' + selectedBook.id, {
      post: {
        id: selectedTodo.id,
        content: itemText,
        status: false,
        post_id: selectedBook.id
      }
    })
      .then((response) => {
        commit('responseAdd', response)
      })
  },
  // 習慣化リストを削除
  delete ({ commit }, id) {
    this.$axios.$delete(url.POST_API + 'post_items/' + id)
      .then((response) => {
        commit('responseAdd', response)
      })
  }
}
