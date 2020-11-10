//自定义打包配置

module.exports = {
    devServer: {
        port: 8808,
        open: true
    },
    publicPath: process.env.NODE_ENV === "production" ? "" : "/",
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === "production", config => {
            config
                .entry("app")
                .clear()
                .add("./src/main.js");

            config.set("externals", {
                vue: "Vue",
                "vue-router": "VueRouter",
                axios: "axios",
                lodash: "_",
                echarts: "echarts",
                nprogress: "NProgress"
            });

            config.plugin("html").tap(args => {
                args[0].isProd = true; //把参数传递到html中 判断是否是开发和发布模式
                return args;
            });
        });

        // 开发模式
        config.when(process.env.NODE_ENV === "development", config => {
            config
                .entry("app")
                .clear()
                .add("./src/main-dev.js");

            config.plugin("html").tap(args => {
                args[0].isProd = false;
                return args;
            });
        });
    }
};
