export const state = () => ({
  books: [],
  selectedBook: []
})

export const mutations = {
  getBooks (state, res) {
    state.books = res.data.items
  },
  setBook (state, book) {
    state.selectedBook = book
  }
}
