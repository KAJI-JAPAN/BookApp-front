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
  getBooks (state, res) {
    state.books = res.data.items
  },

  // 選択した本
  selectedBook (state, book) {
    state.selectedBook = book
  },
  // 選択解除
  clearBook (state) {
    state.selectedBook = null
  },

  // レスポンスされた本
  responseBook (state, response) {
    state.responseBook = response
  },
  // responseBook削除
  removeResponseBook (state) {
    state.responseBook = []
  },

  // 登録した本
  registeredBook (state, response) {
    state.registeredBook = response
  }
}
