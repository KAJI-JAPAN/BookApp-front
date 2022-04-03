import * as url from './constants/url'

export const state = () => ({
  // イベント管理
  events: [],

  // ドラッグ&ドロップ用
  createEvent: null,

  // 選択したイベント
  selectedEvent: {},

  // イベント画面から本を選択する時のダイアログ
  bookSelectedSchedule: false,

  // まとめて入力画面から本を選択する時
  summarizeBookSelectedSchedule: false,

  // イベントバックアップ
  backupEvent: {}
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

  // 更新時の時間変更用
  updateSelectedEvent (state, payload) {
    state.selectedEvent.start= payload.start
    state.selectedEvent.end= payload.end
  },
  
  //  createEvent
  // 保存済みイベントの時間変更
  updateCreateEvent (state, payload) {
    state.createEvent.start= payload.start
    state.createEvent.end= payload.end
  },

  setCreateEvent (state, payload) {
    state.createEvent = payload
  },

  setIdEvent (state, payload) {
    state.selectedEvent.post_id = payload.post
    state.selectedEvent.post_item_id = payload.post_id
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

  resetEvent (state) {
    state.events = []
  },

  // イベントを指定削除
  deleteEvent(state, payload) {
    state.events.splice(state.events.indexOf(payload), 1)
  },

  // イベント編集
  updateEvent(state, { payload, updateEvent }) {
    state.events.splice(state.events.indexOf(payload),1, updateEvent )
  },

  // bookSelectedSchedule
  switchBookSelectedSchedule (state, payload) {
    state.bookSelectedSchedule = payload
    state.bookSelectedSchedule
  },

  // summarizeBookSelectedSchedul
  switchSummarizeBookSelectedSchedul (state, payload) {
    state.summarizeBookSelectedSchedule = payload
  }
}


export const actions = {

  // イベント追加
  addEvent ({ rootState, commit }, event) {
    
    this.$axios.$post(url.SCHEDULE_API, {
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
            post_item_id: response.post_item_id,
            long_term_id: response.long_term_id
          }
        commit('setEvent', data)
        commit('deleteSelectedEvent')
        if(rootState.book.scheduleBook) { commit('book/clearScheduleBook', {}, { root: true })}
        commit('alertSwitchSuccess', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchSuccess', false, { root: true })
        }, 3000)
      })
  },

  // イベント編集
  updateEvent ({ rootState, commit }, event ) {
    this.$axios.$patch(`${url.SCHEDULE_API}/${event.id}`, {
      post:  {
        id: event.id,
        name: event.name,
        color: event.color,
        start: event.start,
        end: event.end,
        timed: true,
        long_time: event.long_time,
        post_id: event.post_id,
        post_item_id: event.post_item_id
      }
    })
    .then((response) => {
      let data = {
        id: response.id,
        name: response.name,
        color: response.color,
        start: response.start,
        end: response.end,
        timed: true,
        long_time: response.long_time,
        post_id: response.post_id,
        post_item_id: response.post_item_id

      }
      commit('updateEvent', { payload: event, updateEvent: data })
      commit('deleteSelectedEvent')
      commit('alertSwitchSuccess', true, { root: true })
      if(rootState.book.scheduleBook) { commit('book/clearScheduleBook', {}, { root: true })}
      setTimeout(() => {
        commit('alertSwitchSuccess', false, { root: true })
      }, 2000)
    })
  },

  showEvent ({ commit }, value) {
    this.$axios.$get(`${url.SCHEDULE_API}/${value.event.id}`)
    .then((response) => {
      // commit('setBackupEvent', value.event)
      const newStart = value.min
      const newEnd = value.max
      if (newStart === null &&  newEnd === null) {
        commit('setSelectedEvent', response.schedule)
      } else {
        commit('setSelectedEvent', response.schedule)
        commit('updateSelectedEvent', { start: newStart, end: newEnd })
      }
      commit('book/setScheduleBook', response.post, { root: true })
    })
  },

  // イベント削除
  deleteEvent ({ rootState, commit }, event) {
    this.$axios.$delete(`${url.SCHEDULE_API}/${event.id}`)
    .then(() => {
      if(rootState.book.scheduleBook) { commit('book/clearScheduleBook', {}, { root: true })}
      commit('deleteEvent', event)
      commit('deleteSelectedEvent')
      commit('alertSwitchDelete', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchDelete', false, { root: true })
        }, 2000)
      })
  },

  // まとめて追加用
  manyAdditionalEvents ({ rootState, commit }, event) {
    this.$axios.$post(`${url.SCHEDULE_API}/create_many_schedule`, { post: event})
    .then((response) => {
       let data
       response.forEach((response) => {
        data = {
          id: response.id,
          name: response.name,
          color: response.color,
          start: response.start,
          end: response.end,
          updated_at: response.created_at,
          timed: response.timed,
          long_time: response.long_time,
          post_id: response.post_id,
          post_item_id: response.post_item_id,
          long_term_id: response.long_term_id
        }
      commit('setEvent', data)
    })
      if(rootState.book.scheduleBook) { commit('book/clearScheduleBook', {}, { root: true })}
      commit('deleteSelectedEvent')
      commit('alertSwitchSuccess', true, { root: true })
      setTimeout(() => {
        commit('alertSwitchSuccess', false, { root: true })
      }, 3000)
    })
  },
  manyDeletionEvents ({ rootState, commit }, event) {
    this.$axios.$post(`${url.SCHEDULE_API}/${event.id}/delete_many_schedule`, event)
    .then(() => {
      if(rootState.book.scheduleBook) { commit('book/clearScheduleBook', {}, { root: true })}
      commit('deleteEvent', event)
      commit('deleteSelectedEvent')
      commit('alertSwitchDelete', true, { root: true })
        setTimeout(() => {
          commit('alertSwitchDelete', false, { root: true })
        }, 2000)
      })

  }
}
