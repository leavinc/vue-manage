// spu
import request from '@/utils/request'

// 获取spu列表
//      /admin/product/baseSaleAttrList     GET
export function reqSpuList(page,limit,category3Id){
    return request({
        url:`/admin/product/${page}/${limit}`,
        method:'get',
        params:{
            category3Id
        },
    })
}