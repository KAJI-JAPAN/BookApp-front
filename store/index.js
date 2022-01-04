import * as url from './constants/url'

export const actions = {
  // 本と行動リストの登録/////////////////////////////////
  post (context) {
    const list = context.state.todos.list
    const selectedBook = context.state.book.selectedBook

    // サーバーに送る配列を作成
    const postItemsAttributes =
      list.map((item) => {
        return {
          content: item.content,
          status: item.status,
          post_id: selectedBook.id
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
      .then((response) => {
        context.commit('book/responseBook', response)
        context.commit('book/clearBook')
        context.commit('todos/clear')
      })
  },
  // /////////////////////////////////

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

  // 更新
  update (context) {
    const list = context.state.todos.list
    const selectedBook = context.state.book.selectedBook
    const postItemsAttributes =
    list.map((item) => {
      return {
        id: item.id,
        content: item.content,
        status: false
      }
    })
    console.log(postItemsAttributes)
    this.$axios.$patch(url.POST_API + 'posts/' + selectedBook.id, {
      post: {
        post_items_attributes: postItemsAttributes
      }
    })
      .then((response) => {
        context.commit('book/responseBook', response)
      })
  }
}
