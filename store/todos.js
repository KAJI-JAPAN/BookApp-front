export const state = () => ({
  list: [],
  hidden: false
})

export const mutations = {
  // テキスト追加 編集状態じゃない場合はfalse
  add (state, text) {
    state.list.push({
      text,
      status: false
    })
  },

  // 削除
  remove (state, todo) {
    state.list.splice(state.list.indexOf(todo), 1)
  },

  // 編集を反映
  edit (state, { todo, text }) {
    state.list.splice(state.list.indexOf(todo), 1, { text })
  },

  // 編集判断フラグ
  toggle (state, todo) {
    todo.status = !todo.status
  },

  // 編集状態をキャンセル
  cancel (state, todo) {
    todo.status = false
  },

  // アクション登録パネルフラグ
  switching (state) {
    state.hidden = !state.hidden
  }
}

export const actions = {

  postTextAdd ({ commit }, content) {
    const postAxios = this.$axios.$post
    const url = '/api/v1/'

    postAxios(url + 'posts', {
      post: {
        post_items: {
          content,
          status: false
        }
      }
    })
      .then((response) => {
        commit('add', response)
        console.log(response)
      })
  }

  // postTextRemove ({ commit }, todo) {jn
  //   this.$axios.$post(postAxios + url + 'delete', {
  //     post: {
  //       todo
  //     }
  //   })
  //     .then(response =>
  //       commit('remove', todo)
  //     )
  //   }
  // }
}
