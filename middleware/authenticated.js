export default ({ redirect, $auth }) => {
  const loginFlag = $auth.loggedIn
  const guestLoginFlag = JSON.parse(localStorage.getItem('loginFlag'))
  if (!loginFlag || !guestLoginFlag) {
    redirect('user/login')
  }
}
