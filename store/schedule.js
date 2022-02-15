import * as url from './constants/url'

export const state = () => ({
  events: [],
  selectedEvent: {}
})

export const mutatiolns = {
  responseEvent (state, response) {
    state.events = response
  }
}

export const actions = {
  addEvent ({ state, commit }) {
    const selectedEvent = state.selectedEvent

    this.$axios.$post(url.POST_SCHEDULE_API + 'posts', {
      post: {
        start: selectedEvent.start,
        end: selectedEvent.end,
        color: selectedEvent.color
        // bookId: ,
      }
    })
      .then((response) => {
        commit('responseEvent', response)
        commit('alertSwitchEdit', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchEdit', false, { root: true })
        }, 3000)
      })
  }
}
