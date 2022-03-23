import * as url from './constants/url'

export const state = () => ({
  // 選択した本
  books: [],

  // 選択した本クリアフラグ
  selectedBook: null,

  // サーバーから返される情報
  responseBook: [],

  // 登録した本
  registeredBook: []
})

export const mutations = {
  // 本情報
  getBooks (state, payload) {
    state.books = payload.data.items
  },

  // 選択した本
  selectedBook (state, payload) {
    state.selectedBook = payload
  },
  // 選択解除
  clearBook (state) {
    state.selectedBook = null
  },

  // レスポンスされた本
  responseBook (state, payload) {
    state.responseBook = payload
  },
  // responseBook削除
  removeResponseBook (state) {
    state.responseBook = []
  },

  // 登録した本
  registeredBook (state, payload) {
    state.registeredBook = payload
  }
}

export const actions = {
  // 本を削除
  delete ({ state }) {
    const bookId = state.selectedBook.id
    this.$axios.$delete(`${url.POST_API}posts/${bookId}`)
  }
}
