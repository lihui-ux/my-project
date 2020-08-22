//  点击添加购物车
import {
    reqAddOrUpdateCart,
    reqShopCartList,
    reqUpdateIsCheck,
    reqDeleteCart
} from "@/api"
const state = {
    shopCartList: []
}
const actions = {
    //  发送请求给后台，返回成功后才能跳转到购物详情页面
    async addOrUpdateCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        const result = await reqAddOrUpdateCart(skuId, skuNum)
        if (result.code === 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("失败了"))
        }
    },
    //  获取shopcart组件中的数据
    async getShopCartList({
        commit
    }) {
        const result = await reqShopCartList()
        if (result.code === 200) {
            commit("RECEIVESHOPCARTLIST", result.data)
        }
    },
    //  修改单选框的状态发送的请求,修改1个
    async updateIsCheck({
        commit
    }, {
        skuId,
        isChecked
    }) {
        const result = await reqUpdateIsCheck(skuId, isChecked)
        if (result.code === 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("falied"))
        }
    },
    /*  
        处理全选框，由于没有接口，需要自己创建一个接口，然后遍历所有，再利用之前
        写的改变一个单选框的接口一个一个变
    */
    async updateAllIsCheck({
        commit,
        state,
        dispatch
    }, isChecked) {
        let promises = []
        // 遍历购物车，判断如果它的isChecked属性和传过来的一样，那就什么也不干
        state.shopCartList.forEach((item) => {
            if (item.isChecked === isChecked) return
            //  如果属性不一样，就触发修改单个多选框的函数,对这些进行一个一个修改
            let promise = dispatch("updateIsCheck", {
                skuId: item.skuId,
                isChecked
            })
            promises.push(promise)
        })
        //  最后返回
        return Promise.all(promises)
    },
    //  删除一个
    async deleteCart({commit}, skuId) {
        const result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("失败了"))
        }
    },
    //  删除选中的多个
    async deleteAllCheckCart({commit,state,dispatch},) {
        let promises = []
        // 遍历购物车，判断如果它的isChecked为0，就是没用选中，那就什么也不干
        state.shopCartList.forEach((item) => {
            if (item.isChecked === 0) return
            //  选中的就触发修改单个多选框的函数,对这些进行一个一个删除,
            // item.skuId是删除一个时必需要传的参数
            let promise = dispatch("deleteCart",item.skuId)
            promises.push(promise)
        })
        //  最后返回
        return Promise.all(promises)
    },

}
const mutations = {
    RECEIVESHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}