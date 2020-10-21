import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Mypp from "../components/myApp.vue";
import Home from "../components/Home.vue";
import Users from "../components/users/Users.vue";
import Goods from "../components/goods/Goods.vue";
import Categories from "../components/goods/Categories.vue";
import Params from "../components/goods/Params.vue";
import Rights from "../components/rights/Rights.vue";
import Roles from "../components/rights/Roles.vue";
import Orders from "../components/orders/Orders.vue";
import Reports from "../components/reports/Reports.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        // component: Home
        redirect: "/home"
    },

    {
        path: "/home",
        component: Home,
        redirect: "/welcome",
        // props: () => ({ defalutPath: "/users" }),
        children: [
            {
                path: "/welcome",
                component: Mypp
            },
            {
                path: "/goods",
                component: Goods
            },
            {
                path: "/Categories",
                component: Categories
            },
            {
                path: "/params",
                component: Params
            },
            {
                path: "/users",
                component: Users
            },
            {
                path: "/orders",
                component: Orders
            },
            {
                path: "/rights",
                component: Rights
            },
            {
                path: "/roles",
                component: Roles
            },
            {
                path: "/reports",
                component: Reports
            }
        ]
    },
    {
        path: "/login",
        component: Login
    }
];

const router = new VueRouter({
    routes
});
//挂载路由导航首位 检测token 否则login
router.beforeEach((to, from, next) => {
    //to 目的地址
    //from 来自地址
    //next 函数,表示放行
    if (to.path == "/login") {
        return next();
    }
    const token = window.sessionStorage.getItem("token");
    if (!token) {
        return next("/login");
    } else {
        //建议重新获取token判断是否一致
        next();
    }
});
export default router;
