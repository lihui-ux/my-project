//  引入axios
import axios from "axios";
//  引入进度条的js和css，因为nprogress默认是js，所以js直接可以引，
import NProgress from "nprogress"
import  "nprogress/nprogress.css"
// 引入store
import store from "@/store"

//  创建一个mock的数据的实例
const instance = axios.create({
  //  是数据在mock文件下
  baseURL: "/api",
  //  设置请求超时时间
  timeout: 20000,
});

//  请求拦截器和响应拦截器
instance.interceptors.request.use(
  (config) => {
    //把用户的临时身份标识添加到每次请求的请求头当中
    let userTempId = store.state.user.userTempId
    config.headers.userTempId = userTempId
    //  添加token
    let token = store.state.user.userInfo.token
    if(token){
      config.headers.token = token
    }
    
    NProgress.start();
    return config;
  }),

  instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (err) => {
    NProgress.done();
    alert("请求结果失败",err)
    return new Promise(() => {});
  })

export default instance;
