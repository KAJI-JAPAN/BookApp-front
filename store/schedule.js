import * as url from './constants/url'
// import moment from 'moment'

// // カレンダーメソッドコピー用
// export const state = () => ({
//   value: '',
//   colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
//   dragEvent: null,
//   dragStart: null,
//   createEvent: null,
//   createStart: null,
//   extendOriginal: null,
//   selectedElement: null,
//   selectedOpen: false,
//   menu: false,
//   eventName: '',
//   selectedEvent: {},
//   dialog: false,
//   // dateValue: moment().format('yyyy-MM-DD'),
// })


// export const mutations = {
//   setToday (state) {
//     state.value = moment().format('yyyy-MM-DD')
//   },

//   startDrag (state, { event, timed }) {
//     if (event && timed) {
//       state.dragEvent = event
//       state.dragTime = null
//       state.extendOriginal = null
//     }
//   },
//   startTime (state, tms) {
//     const mouse = this.toTime(tms)

//     if (state.dragEvent && state.dragTime === null) {
//       const start = state.dragEvent.start

//       state.dragTime = mouse - start
//     } else {
//       state.createStart = this.roundTime(mouse)

//       state.events.push(state.createEvent)
//     }
//   },


// }


/////////////////////////////////////////////////

export const state = () => ({
  events: [],
  createEvent: null
  // responseEvents: []
})

export const mutations = {
setCreateEvent (state, payload) {
  state.createEvent = payload
},

  setEvent (state, payload) {
    state.events.push(payload)
  },

  pushCreateEvent (state) {
    state.events.push(state.createEvent)
  },

  isCancelDragEvent (state, payload) {
    const i = state.events.indexOf(payload)
    if (i !== -1) {
      state.events.splice(i, 1)
    }
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
