import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/css/global.css";

import axios from "axios";

//增加头部进度条 Nprogress 组件
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
axios.defaults.baseURL =
    "https://www.fastmock.site/mock/5ed9366683fc2c19dce8aabb33f46592/vueShop/api";

//请求开始时候,显示进度条
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    Nprogress.start();
    return config;
});
//异步加载完成后隐藏进度条
axios.interceptors.response.use(config => {
    Nprogress.done();
    return config;
});

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
