import * as url from './constants/url'

export const state = () => ({
  events: [],
  createEvent: null,
  selectedEvent: {}
})

export const mutations = {

  // selectedEvent

  setSelectedEvent (state, payload) {
    state.selectedEvent = payload
  },

  setSelectedEventColor (state, payload) {
    state.selectedEvent.color = payload
  },

  setSelectedEventName (state, payload) {
    state.selectedEvent.name = payload
  },
  
  //  createEvent
  updateCreateEvent (state, payload) {
    state.createEvent.start= payload.start
    state.createEvent.end= payload.end
  }, 

  setCreateEvent (state, payload) {
    state.createEvent = payload
  },

  // events
  setEvent (state, payload) {
    state.events.push(payload)
    console.log(state.events)
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
  },

  deleteEvent(state, payload) {
    state.events.splice(state.events.indexOf(payload), 1)
    console.log(state.events)
  }
}


export const actions = {
  addEvent ({ commit }, data) {
    const selectedEvent = data
    this.$axios.$post(url.SCHEDULE_API, {
      post: {
        name: selectedEvent.name,
        start: selectedEvent.start,
        end: selectedEvent.end,
        color: selectedEvent.color
      }
    })
      .then((response) => {
        console.log(response)
         let data = {
            id: response.id,
            name: response.name,
            color: response.color,
            start: parseInt(response.start),
            end: parseInt(response.end),
            updated_at: response.created_at,
            timed: response.timed
          }
        commit('setEvent', data)
        commit('alertSwitchSuccess', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchSuccess', false, { root: true })
        }, 3000)
      })
  },

  deleteEvent ({ state, commit }, selectedEvent) {
    this.$axios.$delete(`${url.SCHEDULE_API}/${selectedEvent.id}`)
    .then((response) => {
      commit('deleteEvent', selectedEvent)
        commit('alertSwitchDelete', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchDelete', false, { root: true })
        }, 3000)
      })
      console.log(state.events)
  }
}
