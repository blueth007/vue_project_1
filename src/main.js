import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/css/global.css";
import base from "./assets/js/base"; //引用

import axios from "axios";
axios.defaults.baseURL =
    "https://www.fastmock.site/mock/5ed9366683fc2c19dce8aabb33f46592/vueShop/api";
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
});
Vue.prototype.$http = axios;
Vue.use(base); //将全局函数当做插件来进行注册
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
