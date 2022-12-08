import store from '@/store'

/**
 * 判断当前用户是否有此按钮权限
 * 按钮权限字符串 permission
 */
export default function hasBtnPermission(permission) {
  // 得到当前用户的所有按钮权限
  const myBtns = store.getters.buttons
  // 如果指定的功能权限在myBtns中, 返回true ==> 这个按钮就会显示, 否则隐藏
//indexOf(查找目标值，开始下标/可以不传)方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
  return myBtns.indexOf(permission) !== -1 
}
