import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
// import Mypp from "../components/myApp.vue";
import Home from "../components/Home.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
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
