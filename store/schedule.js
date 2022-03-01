import * as url from './constants/url'

export const state = () => ({
  events: [],
  // responseEvents: []
})

export const mutations = {
  setEvent (state, payload) {
    state.events.push(payload)
  },

  isCancelDragEvent (state, payload) {
    const i = state.events.indexOf(payload)
    if (i !== -1) {
      state.events.splice(i, 1)
    }
  }
}

export const actions = {
  addEvent ({ commit, state }, data) {
    const selectedEvent = data

    this.$axios.$post(url.SCHEDULE_API, {
      post: {
        name: selectedEvent.name,
        start: selectedEvent.start,
        end: selectedEvent.end,
        color: selectedEvent.color
        // bookId: ,
      }
    })
      .then((response) => {
        commit('setEvent', response)
        commit('alertSwitchSuccess', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchSuccess', false, { root: true })
        }, 3000)
      })
      console.log(state.events)
  },

  deleteEvent ({ state, commit }, eventId) {
    this.$axios.$delete(`${url.SCHEDULE_API}/${eventId}`)
      .then((response) => {
        commit('setEvent', response)
        commit('alertSwitchDelete', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchDelete', false, { root: true })
        }, 3000)
      })
      console.log(state.events)
  }
}
