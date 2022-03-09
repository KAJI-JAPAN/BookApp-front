import * as url from './constants/url'

export const state = () => ({
  events: [],
  createEvent: null,
  // createEvent: null
})

export const mutations = {

  updateCreateEvent (state, payload) {
    state.createEvent.start= payload.start
    state.createEvent.end= payload.end
  }, 

  setCreateEvent (state, payload) {
    state.createEvent = payload
  },

  setEvent (state, payload) {
    state.events.push(payload)
  },

  pushCreateEvent (state) {
    state.events.push(state.createEvent)
  },

  isCancelDragEvent (state) {
    const i = state.events.indexOf(state.createEvent)
    if (i !== -1) {
      state.events.splice(i, 1)
    }
  },

  cancelEvent (state) {
    state.events.pop()
  }
}

export const getters = {
  events(state) {
    return state.events
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
