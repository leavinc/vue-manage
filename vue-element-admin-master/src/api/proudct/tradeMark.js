// tradeMark
import request from '@/utils/request'

// 获取品牌列表
// /admin/product/baseTrademark/{page}/{limit}    GET
export function reqTradeMarkList(page,limit) {
    return request({
      url: `/admin/product/baseTrademark/${page}/${limit}`,
      method: 'get',
    })
}

// 新增或者修改品牌
//    /admin/product/baseTrademark/save     POST
//    /admin/product/baseTrademark/update   PUT
export function reqSaveTradeMark(data){
  // 修改
  if(data.id){
    return request({
      url:'/admin/product/baseTrademark/update',
      method:'put',
      data
    })
    // 新增
  }else{
    return request({
      url:'/admin/product/baseTrademark/save',
      method:'post',
      data
    })
  }
}

// 删除品牌
// /admin/product/baseTrademark/remove/{id}   DELETE
export function reqDeleteTrade(id){
  return request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete'
  })
}
