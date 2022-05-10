export const state = () => ({
  loading: false
})

export const mutation = {
  setLoading (state, payload) {
    state.loading = payload
  }
}
