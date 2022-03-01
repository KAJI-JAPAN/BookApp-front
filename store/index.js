import * as url from './constants/url'

export const state = () => ({
  alertError: false,
  alertEdit: false,
  alertDelete: false,
  alertSuccess: false
})

export const mutations = {

  alertSwitchError (state, boolean) {
    state.alertError = boolean
  },

  alertSwitchDelete (state, boolean) {
    state.alertDelete = boolean
  },

  alertSwitchSuccess (state, boolean) {
    state.alertSuccess = boolean
  }
}

export const actions = {
  // 本と行動リストの登録/////////////////////////////////
  post ({ state, commit }) {
    const list = state.todos.list
    const selectedBook = state.book.selectedBook

    // サーバーに送る配列を作成
    const postItemsAttributes =
      list.map((item) => {
        return {
          content: item.content,
          status: item.status
        }
      })

    // plugin/bookInfo  $title,$author,$image
    this.$axios.$post(url.POST_API + 'posts', {
      post: {
        title: this.$title(selectedBook),
        author: this.$author(selectedBook),
        image: this.$image(selectedBook),
        post_items_attributes: postItemsAttributes
      }
    })
      .then((response) => {
        commit('alertSwitchRegister', true)
        setTimeout(() => {
          commit('alertSwitchRegister', false)
        }, 3000)
        commit('book/responseBook', response)
        commit('book/clearBook')
        commit('todos/clear')
      })
      .catch(() => {
        commit('alertSwitchError', true)
        setTimeout(() => {
          commit('alertSwitchError', false)
        }, 3000)
      })
  }
}
