import Vue from "vue"
import VueRouter from "vue-router"
import routes from "@/router/routes"
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
      //控制跳转过去之后滚动位置在哪里
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
export default router


//  解决多次点击时出现的bug(编程式导航)
const originPush = VueRouter.prototype.push 
const originRepalce = VueRouter.prototype.replace

VueRouter.prototype.push = function (location,onResoved,onRejected){
    //  判断  如果没有传递成功或失败的回调，就返回一个有处理功能的
    if (onResoved === undefined && onRejected === undefined ){
        return originPush.call(this,location).catch(()=>{})
    }else{   //  如果有处理，就直接返回处理的函数onResoved和onRejected
        return originPush.call(this,location,onResoved,onRejected)
    }
 
}
VueRouter.prototype.replace = function (location,onResoved,onRejected){
    //  判断  如果没有传递成功或失败的回调，就返回一个有处理功能的
    if (onResoved === undefined && onRejected === undefined ){
        return originRepalce.call(this,location).catch(()=>{})
    }else{   //  如果有处理，就直接返回处理的函数onResoved和onRejected
        return originRepalce.call(this,location,onResoved,onRejected)
    }
}