import * as url from '@/store/constants/url'

export const actions = {
  guestLogin () {
    this.$axios.$post(`${url.POST_API}auth/guests`)
      .then((res) => {
        let guestLoginFlag = { guestLoginFlag: true }
        let guestLoginAlert = { guestLoginAlert: true }
        localStorage.setItem('guestLoginAlert', JSON.stringify(guestLoginAlert))
        sessionStorage.setItem('guestLoginFlag', JSON.stringify(guestLoginFlag))
        this.$auth.loginWith('local', {
          data:  {
            email: res.email,
            password: res.password,
            guest: true
          }
        })
        $nuxt.$router.replace('/search')
      })
  }
} 
