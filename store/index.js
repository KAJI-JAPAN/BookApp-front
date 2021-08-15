import * as url from './constants/url'

export const actions = {
  // ユーザーが選択した本をサーバーに送る
  post (context) {
    // plugin/bookInfo  title,author,image
    this.$axios.$post(url.POST_ITEMS_API + 'posts', {
      post: {
        title: this.$title(context.state.book.selectedBook),
        author: this.$author(context.state.book.selectedBook),
        image: this.$image(context.state.book.selectedBook),
        post_item_attributes: {
          content: this.state.todos.list,
          status: false
        }
      }
    })
      .then((responsebook) => {
        context.commit('book/userBook', responsebook)
      })
  }
}
