import {reqTradeInfo} from "@/api"

const state={
    tradeInfo:{}
}
const actions ={
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code===200){
            commit("RECIVETRADEINFO",result.data)
        }
    },
}
const mutations={
    RECIVETRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}
const getters={}
export default {
    state,
    actions,
    mutations,
    getters,
}
