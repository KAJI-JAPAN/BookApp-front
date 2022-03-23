import * as url from './constants/url'

export const state = () => ({
  // 登録したテキスト
  list: [],
  hidden: false,
  responseAlert: null,
  selectedTodo: []
})

export const mutations = {
  // list
  // テキスト追加 編集状態じゃない場合は status: false
  add (state, content) {
    state.list.push({
      content,
      status: false
    })
  },

  // 登録済み習慣化リストをbook/_idで取得
  regissterdList (state, response) {
    state.list = response
  },
  editAdd (state, payload) {
    state.list.push(payload)
  },

  // 削除
  remove (state, payload) {
    state.list.splice(state.list.indexOf(payload), 1)
  },

  // 編集を反映
  edit (state, { todo, content }) {
    state.list.splice(state.list.indexOf(todo), 1, { content })
  },

  // リスト削除
  clear (state) {
    state.list = []
  },

  // 編集判断フラグ
  toggle (state, payload) {
    payload.status = !payload.status
  },

  // 編集状態をキャンセル
  cancel (state, payload) {
    payload.status = false
  },

  // hidden
  // アクション登録パネルフラグ
  switching (state) {
    state.hidden = !state.hidden
  },

  // アラート用レスポンス
  responseAdd (state, payload) {
    state.responseAlert = payload
  },

  // selectedTodo
  // 選択したtodoを取得
  setSelectedTodo (state, payload) {
    state.selectedTodo = payload
  }
}

//  編集画面用TODO追加、編集
export const actions = {
  // 編集画面取得時にselectedBookは取得済みなのでIDは問題なし
  // $axios.$postで送るとパスパラメーターにIDを含むためエラーになる。$patchで送って編集追加
  // rootStateを経由するとstoreにある他のモジュールの値を参照可能
  add ({ rootState, commit }, itemText) {
    const selectedBook = rootState.book.selectedBook
    this.$axios.$patch(`${url.POST_ITEMS_API}${selectedBook.id}`, {
      post: {
        content: itemText,
        status: false,
        post_id: selectedBook.id
      }
    })
      .then((response) => {
        // alertを追加。alertは共通処理なのでindex/jsで管理。第３引数にroot: trueでindex/jsのMutationsを利用
        // レスポンスの値をeditAddで反映
        commit('editAdd', response)
        commit('alertSwitchSuccess', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchSuccess', false, { root: true })
        }, 3000)
      })
      .catch(() => {
        commit(' alertSwitchError', true, { root: true })
        setTimeout(() => {
          commit(' alertSwitchError', false, { root: true })
        }, 3000)
      })
  },
  // 更新ようなので、selectedTodoで編集対象のIDを取得
  update ({ rootState, commit }, { itemText, selectedTodo }) {
    const selectedBook = rootState.book.selectedBook
    this.$axios.$patch(`${url.POST_ITEMS_API}${selectedBook.id}`, {
      post: {
        id: selectedTodo.id,
        content: itemText,
        status: false,
        post_id: selectedBook.id
      }
    })
      .then((response) => {
        commit('edit', { todo: this.selectedTodo, content: response.content })
        commit('alertSwitchSuccess', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchSuccess', false, { root: true })
        }, 3000)
      })
      .catch(() => {
        commit('alertSwitchError', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchError', false, { root: true })
        }, 3000)
      })
  },
  // 習慣化リストを削除
  // catchは編集用のエラーメッセージを流用
  delete ({ commit }, todo) {
    this.$axios.$delete(`${url.POST_ITEMS_API}${todo.id}`)
      .then(() => {
        commit('remove', todo)
        commit('alertSwitchDelete', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchDelete', false, { root: true })
        }, 3000)
      })
      .catch(() => {
        commit('alertSwitchError', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchError', false, { root: true })
        }, 3000)
      })
  }
}
