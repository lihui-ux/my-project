//  请求数据的接口文件

//  引入请求数据的文件
import Ajax from "@/ajax/Ajax"

// 引入mockAjax
import mockAjax  from "@/ajax/mockAjax"

export const reqCategoryList = ()=>{
    return Ajax({
        url:"/product/getBaseCategoryList",
        method:"get"
    })
}

export const reqBannerList = ()=>{
    return mockAjax({
        url:"/banner",
        method:"get"
    })
};
export const reqFloorList = ()=>{
    return mockAjax({
        url:"/floor",
        method:"get"
    })
}

//searchParams代表搜索参数，这个参数必须要有，至少得是一个没有属性的空对象
//参数如果是一个空的对象，代表搜索请求获取的是全部的数据
//参数如果有搜索条件，代表获取的就是搜索条件匹配的数据
export const reqGoodsListInfo = (searchParams)=>{
    return Ajax({
        url:"/list",
        method:"post",
        data:searchParams
    })
}
export const reqGoodsDetailInfo = (skuId)=>{
    return Ajax({
        url:`/item/${skuId}`,
        method:"get",
    })
}

// reqGoodsListInfo({})
// reqCategoryList()