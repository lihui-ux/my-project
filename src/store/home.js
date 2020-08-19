// 引入数据
import {reqCategoryList,reqBannerList,reqFloorList} from "@/api"


const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions = {
    async getCategoryList({
        commit
    }) {
        // 调用reqCategoryList会得到所有的数据
        const result = await reqCategoryList()
        //  判断状态码
        if (result.code === 200) {
            // result.data就是所有的数据，将它传给RECEIVECATEGORYLIST
            commit("RECEIVECATEGORYLIST", result.data)
        }
    },

    async getBannerList({commit}) {
        const result = await reqBannerList()
        if (result.code === 200) {
            commit("RECEIVEBANNERLIST", result.data)
        }
    },
    async getFloorList({commit}) {
        const result = await reqFloorList()
        if (result.code === 200) {
            commit("RECEIVEFLOORLIST", result.data)
        }
    }
}
const mutations = {
    //  categoryList就是接受的上面传递的数据result.data
    RECEIVECATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    RECEIVEBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    RECEIVEFLOORLIST(state, floorList) {
        state.floorList = floorList
    },

}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}