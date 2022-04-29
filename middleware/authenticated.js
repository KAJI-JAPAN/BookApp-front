export default ({ redirect, $auth }) => {
  const loginFlag = $auth.loggedIn
  const guestLoginFlag = JSON.parse(sessionStorage.getItem('guestLoginFlag'))
  if (!loginFlag && !guestLoginFlag) {
    redirect('/user/login')
  }
}
