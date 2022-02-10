import {reqSpuList} from '@/api/proudct/spu'


export default {
  namespaced: true,
  state:{
    
  },
  mutations:{
    
  },
  actions:{
    getSpuList({commit},{page,limit,id}){
        return new Promise((resolve,reject) => {
            reqSpuList(page,limit,id).then((result) => {
                console.log(result,123123)
            }).catch((err) => {
                
            });
        }
        )
    }
  }
}
