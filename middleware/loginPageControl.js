export default ({ redirect, $auth }) => {
  const loginFlag = $auth.loggedIn
  if (loginFlag) {
    redirect('/')
  }
}
