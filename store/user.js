import * as url from './constants/url'

export const actions = {
  gestLogin () {
    this.$axios.$post(`${url.POST_API}/auth/guest_sign_in`)
    .then((response) => {
      console.log(response)
    })
  }
}
