import * as api from './constants/url.js'

export const state = () => ({
  list: [],
  hidden: false
})

export const mutations = {
  // テキスト追加 編集状態じゃない場合は status: false
  add (state, response) {
    state.list.push({
      id: response.id,
      content: response.content,
      status: response.status
    })
  },

  // 削除
  remove (state, response) {
    // state.list.splice(state.list.indexOf(todo), 1)
    state.list = response
  },

  // 編集を反映
  edit (state, { todo, text }) {
    state.list.splice(state.list.indexOf(todo), 1, { text })
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
  }
}

export const actions = {

  // 追加リクエスト
  post ({ commit }, text) {
    this.$axios.$post(api.POST_ITEMS_API + 'posts', {
      post_items: {
        content: text,
        status: false
      }
    })
      .then((response) => {
        commit('add', response)
      })
  },

  // 削除リクエスト
  remove ({ commit }, todo) {
    this.$axios.$delete(api.POST_ITEMS_API + 'posts/' + todo.id, {
      params: {
        content_id: todo.id
      }
    })
      .then((response) => {
        commit('remove', response)
      })
  }
}
