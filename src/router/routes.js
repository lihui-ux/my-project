import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"

export default [
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