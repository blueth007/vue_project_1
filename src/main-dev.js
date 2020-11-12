import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/css/global.css";
import base from "./assets/js/base"; //引用
import store from "./store";
import axios from "axios";

//增加头部进度条 nprogress 组件
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //通过静态调用已加载
axios.defaults.baseURL =
    "https://www.fastmock.site/mock/5ed9366683fc2c19dce8aabb33f46592/vueShop/api";

//请求开始时候,显示进度条
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    NProgress.start();
    return config;
});
//异步加载完成后隐藏进度条
axios.interceptors.response.use(config => {
    NProgress.done();
    return config;
});

Vue.prototype.$http = axios;
Vue.use(base); //将全局函数当做插件来进行注册
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
