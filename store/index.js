import * as url from './constants/url'
// import * as todos from './todos'

export const actions = {
  // ユーザーが選択した本をサーバーに送る
  post (context) {
    const list = context.state.todos.list
    const selectedBook = context.state.book.selectedBook

    // plugin/bookInfo  $title,$author,$image
    this.$axios.$post(url.POST_API + 'posts', {
      post: {
        title: this.$title(selectedBook),
        author: this.$author(selectedBook),
        image: this.$image(selectedBook),
        post_items_attributes: [{
          content: list[0].content,
          status: list[0].status
        }]
      }
    })
      .then((responseBook) => {
        context.commit('book/userBook', responseBook)
        context.commit('book/clearBook')
        context.commit('todos/clear')
      })
  },
  get (commit) {
    this.$axios.$get(url.POST_API + 'posts')
      .then((response) => {
        commit('registerdBook', response)
      })
  }
}
