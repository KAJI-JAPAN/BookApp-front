export const state = () => ({
  loginFlag: false
})

export const actions = {
  setLoginFlag (state, payload) {
    state.loginFlag = payload
  }
}
