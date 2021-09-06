export const state = () => ({
  // 選択した本
  books: [],

  // 選択した本クリアフラグ
  selectedBook: null,

  // サーバーから受け取った本
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
  // 登録する本
  userBook (state, response) {
    state.responseBook = response
  },

  // レスポンスされた本
  responseBook (state, response) {
    state.responseBook = response
  },

  // 登録した本
  registeredBook (state, response) {
    state.registeredBook = response
  }
}
