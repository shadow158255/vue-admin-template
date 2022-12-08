import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

//从Cookies中获取Token
export function getToken() {
  return Cookies.get(TokenKey)
}
//将token存入本地（Cookie）中
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

//从本地删除Token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
