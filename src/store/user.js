//  引入工具函数，创建uuid
import {getUserTempId} from "@/utils/userabout"
import {   reqRegister,reqLogin,reqLogout } from "@/api"

const state = {
  //用户的临时身份标识 userTempId 我们在state当中存一份
  //为了以后获取的时候，效率更高一些
  //用户的身份标识是要存储在永久保存的地方（localStorage）,并且尽量不要更改
  //先去从localStorage内部去取  有就用  没有就得创建，可以使用函数
  userTempId: getUserTempId(),
  userInfo:JSON.parse(localStorage.getItem("USERINFO_KEY")) || {}
}
const actions = {
    async register({commit}, userInfo){
      const result = await reqRegister(userInfo)
      if(result.code === 200){
          return "ok"
      }else{
        return Promise.reject(new Error("falied"))
      }
    },
    //  登录页发送请求
    async  login({commit},userInfo){
        const result =await reqLogin(userInfo)
        if(result.code===200){
          commit("RECEIVEUSERINFO",result.data)
         //我们要想自动登录，必须把登录后的信息存储起来，这样的话刷新页面vuex当中存储的数据就不见了
      //但是我们不用再去登录给vuex存数据，而是让vuex从存储的地方去拿
          localStorage.setItem("USERINFO_KEY",JSON.stringify(result.data))
            return "ok"
        }else{
          return Promise.reject(new Error("falied"))
        }
    },
    //  退出登录
    async logout({commit}){
        const result = await reqLogout()
        console.log(result);
        if(result.code === 200){
          localStorage.removeItem("USERINFO_KEY")
          commit("RECEIVELOGOUT",{})
          return "ok"
        }else{
          return Promise.reject(new Error("falied"))
        }
    }
}


const mutations = {
  RECEIVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  //  清空state中的userinfo信息，退出登录
  RECEIVELOGOUT(state){
    state.userInfo = {}
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}