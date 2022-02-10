import {reqCategory1List,reqCategory2List,reqCategory3List,reqTradeInfo,reqAddOrUpdateInfo} from '@/api/proudct/attr'


export default {
  namespaced: true,
  state:{
    List1:[]
  },
  mutations:{
    LIST1(state,value){
        state.list1 = value
    }
  },
  actions:{
    //   获取一级列表
    getCategory1List({commit}){
        return new Promise((resolve,reject) => {
            reqCategory1List().then((result) => {
                commit('LIST1',result.data)
                resolve(result)
            }).catch((err) => {
                console.log(err)
            });
        })
    },
    // 获取二级列表
    getCategory2List({commit},category1Id){
        return new Promise((resolve,reject) => {
            reqCategory2List(category1Id).then((result) => {
                
                resolve(result)
            }).catch((err) => {
                console.log(err)
            });
        })
    },
    // 获取三级列表
    getCategory3List({commit},category2Id){
        return new Promise((resolve,reject) => {
            reqCategory2List(category2Id).then((result) => {
                console.log(result)
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    },
    // 获取商品属性
    getTradeInfo({commit},data){
        return new Promise((resolve,reject) => {
            
            reqTradeInfo(data.category1Id,data.category2Id,data.category3Id).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        }
        )
    },
    // 添加或者修改商品属性
    addOrUpdateInfo({commit},data){
        return new Promise((resolve,reject) => {
          reqAddOrUpdateInfo(data).then((result) => {
                resolve()
          }).catch((err) => {
              reject(err)
          });
        }
        )
    }
  }
}
