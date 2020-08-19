
/*
    请求search页面商品的信息
*/
import {reqGoodsListInfo} from "@/api"

const state={
    goodsListInfo:{}
}
//  searchParams是接收到页面dispatch传过来的参数
const actions={
    async getGoodsListInfo({commit},searchParams){
        const result = await reqGoodsListInfo(searchParams)
        if(result.code ===  200){
            commit("RECEIVEGOODSLISTINFO",result.data)
        }
    }
}
const mutations={
    RECEIVEGOODSLISTINFO(state,goodsListInfo){
        state.goodsListInfo = goodsListInfo
    }
}
const getters={
    attrsList(state){
        return state.goodsListInfo.attrsList || []
    },
    goodsList(state){
        return state.goodsListInfo.goodsList || []
    },
    trademarkList(state){
        return state.goodsListInfo.trademarkList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}
