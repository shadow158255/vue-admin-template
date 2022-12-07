//引入axios
import request from '@/utils/request'
//定义常量
const api_name = "admin/system/sysRole"
const api_userName = "admin/system/sysUser"

export default {
  //批量删除
  batchDelete(ids){
    return request({
      //接口路径
      url: `${api_name}`+"/batchRemove",
      method: 'delete',
      data: ids
    })
  },
  //修改-最终修改
  selectById(id){
    return request({
      //接口路径
      url: `${api_name}`+"/findRoleById/"+`${id}`,
      method: 'get',
    })
  },

   //修改-最终修改
   updateRole(roleObj){
    return request({
      //接口路径
      url: `${api_name}`+"/updateRole",
      method: 'post',
      //传递jason格式参数使用data（后端接收参数加@requestBody时使用data，不加使用params）
      data:roleObj
    })

  },
  //添加
  addRole(roleObj){
    return request({
      //接口路径
      url: `${api_name}`+"/save",
      method: 'post',
      //传递jason格式参数使用data（后端接收参数加@requestBody时使用data，不加使用params）
      data:roleObj
    })

  },
  //列表
  getPageList(page,limit,queryObj){
    return request({
      //接口路径
      url: `${api_name}`+"/"+`${page}`+"/"+`${limit}`,
      method: 'get',
      params:queryObj
    })

  },
  //删除
  removeRole(id){
    return request({
      //接口路径
      url: `${api_name}`+"/remove/"+`${id}`,
      method: 'delete'
    })

  },
  //根据用户id查询用户已分配的角色
getRolesByUserId(userId) {
  return request({
    url: `${api_userName}`+"/toAssign/"+`${userId}`,
    method: 'get'
  })
},

//分配角色
assignRoles(assginRoleVo) {
  return request({
    url: `${api_userName}`+"/doAssign",
    method: 'post',
    data: assginRoleVo
  })
}
}
