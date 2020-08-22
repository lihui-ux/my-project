//  引入vue和vuex
import Vue from "vue"
import App from "@/App"
import router from "@/router"
import TypeNav from "@/components/TypeNav"
import store from "@/store"
import Slider from "@/components/slider"
import Pagination from "@/components/pagination"
import 'swiper/css/swiper.css'
//  引入所有接口
import * as API from "@/api"
import '@/mock/mockServer'
//  引入需要的
import { MessageBox, Message } from 'element-ui';
//  声明或注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

/* 
    删除搜索框里的记录，需要用到全局事件总线，注册
*/
new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
        // 添加到原型上，让所有组件都能使用
        Vue.prototype.$API = API
    },
})
//  全局注册组件
Vue.component("TypeNav", TypeNav)
Vue.component("Slider", Slider)
Vue.component("Pagination", Pagination)

//  去掉提示
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App),
    store
}).$mount("#app")