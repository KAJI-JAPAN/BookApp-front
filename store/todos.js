export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text
    })
  },
  remove (state, todo) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  edit (state, { todo, text }) {
    state.list.splice(state.list.indexOf(todo), 1, { text })
  }
}

export const actions = {
  editAction ({ commit }, { todo, text }) {
    commit('edit', { todo, text })
  }
}
