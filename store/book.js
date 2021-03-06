import * as url from './constants/url'

export const state = () => ({
  // 選択した本
  books: [],

  // 選択した本クリアフラグ
  selectedBook: null,

  // サーバーから返される情報
  responseBook: [],

  // 登録した本
  registeredBook: [],

  // カレンダー表示用
  scheduleBook: null
})

export const mutations = {
  // books
  // 本情報
  getBooks (state, payload) {
    state.books = payload.items
    console.log(payload)
  },

  // selectedBook
  // 選択した本
  selectedBook (state, payload) {
    state.selectedBook = payload
  },
  // 選択解除
  clearBook (state) {
    state.selectedBook = null
  },

  //responseBook
  // レスポンスされた本
  responseBook (state, payload) {
    state.responseBook = payload
  },
  // responseBook削除
  removeResponseBook (state) {
    state.responseBook = []
  },

  // registeredBook 
  // 登録した本
  registeredBook (state, payload) {
    state.registeredBook = payload
  },

  // scheduleBook
  setScheduleBook (state, payload) {
    state.scheduleBook = payload
  },
  // scheduleBook削除
  clearScheduleBook (state) {
    state.scheduleBook = null
  }
}

export const actions = {
  serchBooks ({ commit}, payload) {
    this.$axios.$post(`${url.SEARCH_BOOKS}`, {
      keyword: payload
    })
    .then((response) => {
      commit('getBooks', response)
    })
  },
  // 本を削除
  delete ({ state, commit }) {
    const bookId = state.selectedBook.id
    this.$axios.$delete(`${url.POST_API}posts/${bookId}`)
    .then(() => {
      $nuxt.$router.push('/registeredBook')
      commit('clearScheduleBook')
    })
  }
}
