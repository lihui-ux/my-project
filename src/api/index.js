//  请求数据的接口文件

//  引入请求数据的文件
import Ajax from "@/ajax/Ajax"

// 引入mockAjax
import mockAjax from "@/ajax/mockAjax"

export const reqCategoryList = () => {
    return Ajax({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

export const reqBannerList = () => {
    return mockAjax({
        url: "/banner",
        method: "get"
    })
};
export const reqFloorList = () => {
    return mockAjax({
        url: "/floor",
        method: "get"
    })
}

//searchParams代表搜索参数，这个参数必须要有，至少得是一个没有属性的空对象
//参数如果是一个空的对象，代表搜索请求获取的是全部的数据
//参数如果有搜索条件，代表获取的就是搜索条件匹配的数据
export const reqGoodsListInfo = (searchParams) => {
    return Ajax({
        url: "/list",
        method: "post",
        data: searchParams
    })
}
export const reqGoodsDetailInfo = (skuId) => {
    return Ajax({
        url: `/item/${skuId}`,
        method: "get",
    })
}
//  请求添加或修改购物车
export const reqAddOrUpdateCart = (skuId, skuNum) => {
    return Ajax({
        url: `/cart/addToCart/${ skuId }/${ skuNum }`,
        method: "post",
    })
}
//  请求购物车详情页的数据shopcart
export const reqShopCartList = (skuId, skuNum) => {
    return Ajax({
        url: "/cart/cartList",
        method: "get",
    })
}

// 请求修改单个选中框 
//  /api/cart/checkCart/{skuID}/{isChecked}  GET skuID isChecked  没有返回数据
export const reqUpdateIsCheck = (skuId, isChecked) => {
    return Ajax({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "get"
    })
}

//  删除一个
// /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCart = (skuId)=>{
    return Ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:"delete"
    })
}

//  请求注册，注册组件
//  /api/user/passport/register  post  mobile password code -->请求体参数
export const reqRegister=(userInfo)=>{
    return Ajax({
        url:"/user/passport/register",
        method:"post",
        data:userInfo
    })
}
//  登录页面，登录组件
//  /api/user/passport/login  POST  mobile password
export const reqLogin = (userInfo)=>{
    return Ajax({
        url:"/user/passport/login",
        method:"post",
        data:userInfo
    })
}

//  退出登录接口  
//  /api/user/passport/logout   GET
export const reqLogout = ()=>{
    return Ajax({
        url:"/user/passport/logout",
        method:"get"
    })
}

//  获取结算页面的数据
//  /api/order/auth/trade  GET
export const reqTradeInfo= ()=>{
    return Ajax({
        url:"/order/auth/trade",
        method:"get"
    })
}

//  提交订单接口
 //  /api/order/auth/submitOrder?tradeNo={tradeNo}  POST
  
 export const reqSubmitOrder = (tradeNo,tradeInfo)=>{
     return Ajax({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:"post",
        data:tradeInfo
    }) 
 }

 //  获取支付页面的数据
  //  /api/payment/weixin/createNative/{orderId}   GET  
  export const reqPayInfo = (orderId)=>{
      return Ajax({
          url:`/payment/weixin/createNative/${orderId}`,
          method:"get"
      })
  }

  //  查询支付订单状态
 //   /api/payment/weixin/queryPayStatus/{orderId}   GET

  export const reqOrderStatus = (orderId)=>{
      return Ajax({
          url:`/payment/weixin/queryPayStatus/${orderId}`,
          method:"get"
      })
  }


// reqGoodsListInfo({})
// reqCategoryList()