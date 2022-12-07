//引入axios
import request from '@/utils/request'
//定义常量
const api_name = "admin/system/sysUser"

export default {
  //更改用户状态
  changeStates(id,status){
    return request({
      //接口路径
      url: `${api_name}`+"/updateStatus/"+`${id}`+"/"+`${status}`,
      method: 'get',
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
  save(queryObj){
    return request({
      //接口路径
      url: `${api_name}`+"/save",
      method: 'post',
      data:queryObj
    })
  },

  //修改-根据id查询
  getById(id){
    return request({
      //接口路径
      url: `${api_name}`+"/get/"+`${id}`,
      method: 'get',
    })
  },

  //修改
  update(queryObj){
    return request({
      //接口路径
      url: `${api_name}`+"/update",
      method: 'put',
      data:queryObj
    })
  },
  //删除
  remove(id){
    return request({
      //接口路径
      url: `${api_name}`+"/remove/"+`${id}`,
      method: 'delete',
    })
  }
}
