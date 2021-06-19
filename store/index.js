export const state = () => ({
  books: [],
  url: 'https://www.googleapis.com/books/v1/volumes?q=',
  keyword: ''
})

export const mutations = {
  getBooks (state, keyword, res) {
    state.keyword = keyword
    state.books = res
  }

}

export const actinons = {
  async getBookAction ({ commit }) {
    const payload = {
      books: [],
      keyword: state.keyword
    }
    await this.$axios.$get(state.url + payload.keyword + '&maxResults=15')
      .then((res) => {
        payload.books = res.data.items
      })
    commit('getbooks', payload)
  }
}
