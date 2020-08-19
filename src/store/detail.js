import {reqGoodsDetailInfo} from "@/api"
const state={
    goodsDetailInfo:{}
}
const actions={
    async getGoodsDetailInfo({commit},skuId){
        const result = await reqGoodsDetailInfo(skuId)
        if(result.code === 200){
            commit("RECEIVEGOODSDETAILINFO",result.data) 
        }
    }
}
const mutations={
    RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
        state.goodsDetailInfo=goodsDetailInfo
    }
}
const getters={
    categoryView(state){
        //  有就拿数据，没有就返回一个空对象，避免出现undefinde，之后调用会出错
        return state.goodsDetailInfo.categoryView  || {}
    },
    skuInfo(state){
        return state.goodsDetailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsDetailInfo.spuSaleAttrList || []
    },
}
export default {
    state,
    actions,
    mutations,
    getters,
}