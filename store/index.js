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

export const actions = {
  post () {
    const postAxios = this.$axios.$post
    const url = '/api/v1/'

    // ユーザーが選択した本をサーバーに送る
    postAxios(url + 'posts', {
      post: {
        title: this.$title(state.selectedBook),
        author: this.$author(state.selectedBook),
        image: this.$image(state.selectedBook)
      }
    })
      .then((responsebook) => {
        this.$store.commit('userBook', responsebook)
      })
  }

}
