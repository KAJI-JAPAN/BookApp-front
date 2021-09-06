import * as url from './constants/url'

export const actions = {
  // ユーザーが選択した本をサーバーに送る
  post (context) {
    const list = context.state.todos.list
    const selectedBook = context.state.book.selectedBook

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
  },

  // 本を削除
  delete (context) {
    const bookId = context.state.book.selectedBook.id
    this.$axios.$delete(url.POST_API + 'posts/' + bookId)
  },

  update (context) {
    const list = context.state.todos.list
    const bookId = context.state.book.selectedBook.id
    const content =
    list.map((item) => {
      return {
        content: item.content,
        status: false
      }
    })
    this.$axios.$patch(url.POST_API + 'posts/' + bookId, {
      post: {
        post_items_attributes: content
      }
    })
  }
}
