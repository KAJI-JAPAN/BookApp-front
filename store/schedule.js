import * as url from './constants/url'

export const state = () => ({
  events: [],
  createEvent: null,
  selectedEvent: {}
})

export const mutations = {

  // selectedEvent
  // selectedEventに追加
  setSelectedEvent (state, payload) {
    state.selectedEvent = payload
  },

  // selectedEvent削除
  deleteSelectedEvent (state) {
    state.selectedEvent = {}
  },

  // イベントカラーを代入
  setSelectedEventColor (state, payload) {
    state.selectedEvent.color = payload
  },

  // イベントネームを代入
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

  // イベント追加
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

  // イベントキャンセル時削除
  cancelEvent (state) {
    state.events.pop()
  },

  // イベントを指定削除
  deleteEvent(state, payload) {
    state.events.splice(state.events.indexOf(payload), 1)
    console.log(state.events)
  },

  // イベント編集
  updateEvent(state, { payload, updateEvent }) {
    state.events.splice(state.events.indexOf(payload),1, updateEvent )
    console.log(state.events)
  }
}


export const actions = {

  // イベント追加
  addEvent ({ commit }, event) {
    console.log(selectedEvent)
    this.$axios.$post(url.SCHEDULE_API,
      // {post: selectedEvent}, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    {
      post: {
        name: event.name,
        start: event.start,
        end: event.end,
        color: event.color,
        timed: event.timed,
        long_time:  event.long_time ? true : false,
        post_id: event.post_id,
        post_item_id: event.post_item_id
      }
    })
      .then((response) => {
        console.log(response)
         let data = {
            id: response.id,
            name: response.name,
            color: response.color,
            start: response.start,
            end: response.end,
            updated_at: response.created_at,
            timed: response.timed,
            long_time: response.long_time,
            post_id: response.post_id,
            post_item_id: response.post_item_id
          }
        commit('setEvent', data)
        commit('deleteSelectedEvent')
        commit('book/clearBook', { root: true })
        commit('alertSwitchSuccess', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchSuccess', false, { root: true })
        }, 3000)
      })
  },

  // イベント編集
  updateEvent ({ commit }, event ) {
    this.$axios.$patch(`${url.SCHEDULE_API}/${event.id}`, {
      post:  {
        id: event.id,
        name: event.name,
        color: event.color,
        start: event.start,
        end: event.end,
        timed: true
      }
    })
    .then((response) => {
      let data = {
        id: response.id,
        name: response.name,
        color: response.color,
        start: parseInt(response.start),
        end: parseInt(response.end),
        timed: true
      }
      commit('updateEvent', { payload: selectedEvent, updateEvent: data })
      commit('deleteSelectedEvent')
      commit('alertSwitchSuccess', true, { root: true })
      commit('book/clearBook', { root: true })
      setTimeout(() => {
        commit('alertSwitchSuccess', false, { root: true })
      }, 2000)
    })
  },

  showEvent ({ commit }, event) {
    this.$axios.$get(`${url.SCHEDULE_API}/${event.id}`)
    .then((response) => {
      commit('setSelectedEvent', response.schedule)
      commit('book/selectedBook', response.post, { root: true })
      console.log(response)
    })
  },

  // イベント削除
  deleteEvent ({ commit }, event) {
    this.$axios.$delete(`${url.SCHEDULE_API}/${event.id}`)
    .then(() => {
      commit('deleteEvent', event)
      commit('deleteSelectedEvent')
      commit('book/clearBook', { root: true })
      commit('alertSwitchDelete', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchDelete', false, { root: true })
        }, 2000)
      })
  }
}
