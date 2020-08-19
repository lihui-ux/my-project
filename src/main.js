//  引入vue和vuex
import Vue from "vue"
import App from "@/App"
import router from "@/router"
import TypeNav from "@/components/TypeNav"
import store from "@/store"
import Slider from "@/components/slider"
import Pagination from "@/components/pagination"
// 引入请求接口文件,测试接口
import  "@/api"
import  "@/mock/mockServer"

/* 
    删除搜索框里的记录，需要用到全局事件总线，注册
*/
new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this 
    },
})
//  全局注册组件
Vue.component("TypeNav",TypeNav)
Vue.component("Slider",Slider)
Vue.component("Pagination",Pagination)

//  去掉提示
Vue.config.productionTip = false
new Vue({
    router,
    render:h => h(App),
    store
}).$mount("#app")


