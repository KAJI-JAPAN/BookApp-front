export default ({ app, store, redirect }, inject) => {
  // エラー用アラート
  inject('errorHandling', () => {
    store.commit('alertSwitchError', true)
    setTimeout(() => {
      store.commit('alertSwitchError', false)
    }, 3000)
  })
  //  成功用アラート
  inject('successHandling', () => {
    store.commit('alertSwitchSuccess', true)
    setTimeout(() => {
      store.commit('alertSwitchSuccess', false)
    }, 3000)
  })

  // 削除成功用アラート
  inject('deleteHandling', () => {
    store.commit('alertSwitchDelete', true)
    setTimeout(() => {
      store.commit('alertSwitchDelete', false)
    }, 3000)
  })

  // ユーザーフォームアラート
  // 成功アラート
  inject('formSuccessHandling', (payload) => {
    store.commit('setLoading', true)
    store.commit('alertSwitchSuccess', true)
    setTimeout(() => {
      store.commit('setLoading', false)
      store.commit('alertSwitchSuccess', false)
      if (payload) { redirect(payload) }
    }, 2000)
  })
  // エラーアラート
  inject('formErrorHandling', () => {
    store.commit('setLoading', true)
    store.commit('alertSwitchError', true)
    setTimeout(() => {
      store.commit('setLoading', false)
      store.commit('alertSwitchError', false)
    }, 2000)
  })
}
