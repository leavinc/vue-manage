// 三级分类
import request from '@/utils/request'


// 获取一级分类
//      /admin/product/getCategory1     GET
export function reqCategory1List(){
    return request({
        url:'/admin/product/getCategory1',
        method:'get'
    })
}

// 获取二级分类
//      /admin/product/getCategory2/{category1Id}       GET
export function reqCategory2List(category1Id){
    return request({
        url:`/admin/product/getCategory2/${category1Id}`,
        method:'get'
    })
}

// 获取三级分类
//      /admin/product/getCategory3/{category2Id}       GET
export function reqCategory3List(){
    return request({
        url:`/admin/product/getCategory3/${category2Id}`,
        method:'get'
    })
}

// 获取商品属性
//      /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}       GET
export function reqTradeInfo(category1Id,category2Id,category3Id){
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}

// 添加商品属性
//      /admin/product/saveAttrInfo     POST
//      data        {
                //   "attrName": "string", 属性名
                //   "attrValueList": [ 属性值列表
                //     {
                //       "attrId": 0,
                //       "id": 0,
                //       "valueName": "string"  属性值名称
                //     }
                //   ],
                //   "categoryId": 0,   三级Id
                //   "categoryLevel": 3,
                //   "id": 0
                // }
export function reqAddOrUpdateInfo(data){
    return request({
        url:'/admin/product/saveAttrInfo',
        method:'post',
        data
    })
}