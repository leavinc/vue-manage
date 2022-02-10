import {reqTradeMarkList,reqSaveTradeMark,reqDeleteTrade} from '@/api/proudct/tradeMark'


export default {
  namespaced: true,
  state:{
    tradeInfo:{}
  },
  mutations:{
    TRADE_INFO(state,value){
      state.tradeInfo = value
    }
  },
  actions:{
    // 获取品牌列表
      getTradeMark({commit},data){
        return new Promise((resolve,reject) => {
          reqTradeMarkList(data.page,data.limit).then((result) => {
              const {data} = result
              commit('TRADE_INFO',data)
              resolve(data)
          }).catch((err) => {
              reject(err)
          });
        })
      },
    // 新增品牌
      saveTradeMark({commit},data){
        return new Promise((resolve,reject) => {
          reqSaveTradeMark(data).then((result) => {
            // 成功返回值
            resolve(result)
          }).catch((err) => {
            reject(err)
          });
        })
      },
    // 删除品牌
      deleteTrade(_,id){
        return new Promise((resolve,reject) => {
          reqDeleteTrade(id).then((result) => {
            resolve(result)
          }).catch((err) => {
            reject(err)
          }); 
        }
        )
      }
  }
}
