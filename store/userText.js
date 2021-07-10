export const state = () => ({
  userText: []
})

export const mutations = {
  // 習慣化テキスト
  getText (state, res) {
    state.userText = res
  }
}
