export const state = () => ({
  books: [],
  selectedBook: null,
  userBook: []
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
    state.userBook = response
  }
}
