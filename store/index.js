export const mutations = {
  setLoggedIn (state, payload) {
    state.loggedIn = payload
  }
}

export const actions = {
  login ({ commit }) {
    commit('setLoggedIn', true)
  }
}
