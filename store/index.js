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

// plugin/bookInfo  title,author,image
export const actions = {
  post (context) {
    const postAxios = this.$axios.$post
    const url = '/api/v1/'

    // ユーザーが選択した本をサーバーに送る
    postAxios(url + 'posts', {
      post: {
        title: this.$title(context.state.selectedBook),
        author: this.$author(context.state.selectedBook),
        image: this.$image(context.state.selectedBook)
      }
    })
      .then((responsebook) => {
        context.commit('userBook', responsebook)
      })
  }

}
