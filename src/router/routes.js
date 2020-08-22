import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"

export default [
    {
        path:"/center",
        component:Center
    },
    {
        path:"/paySuccess",
        component:PaySuccess
    },
    {
        path:"/pay",
        component:Pay
    },
    {
        path: "/trade",
        component: Trade
    },
    {
        path: '/shopCart',
        component: ShopCart
    },
    {
        path: '/addCartSuccess',
        component: AddCartSuccess
    },
    {
        path: '/detail/:skuId',
        component: Detail
    },

    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHide: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHide: true
        }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        name: 'search',
        // props:true
        //    props:{
        //        name:"crise"
        //    }
        props(route) {
            return {keyword:route.params.keyword,keyword2:route.query.keyword}
        }
    },
    { //  重定向
        path: '/',
        redirect: "/home"
    },
]