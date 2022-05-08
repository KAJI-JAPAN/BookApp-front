export default ({ app, store }, inject) => {
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
}
