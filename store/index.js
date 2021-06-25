export const state = () => ({
  books: [],
  selectedBook: null
})

export const mutations = {
  getBooks (state, res) {
    state.books = res.data.items
  },
  setBook (state, book) {
    state.selectedBook = book
  },
  clearBook (state) {
    state.selectedBook = null
  }
}
