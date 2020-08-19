import Vue from "vue"
import Vuex from "vuex"
//  引入home和users模块，在合并
import home from "./home"
import user from "./user"
import search from "./search"
import detail from "./detail"
Vue.use(Vuex)
const state={}
const actions={}
const mutations={}
const getters={}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    //  将其它模块合并到这个文件的几个对象中
    modules:{
        home,
        user,
        search,
        detail
    }
})
