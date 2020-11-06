//根据项目发布阶段需用到的 babel插件
var prodPlugin = [];
if (process.env.NODE_ENV === "production") {
    prodPlugin.push("transform-remove-console");
}

module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk"
            }
        ],
        //发布时需要用到的插件
        ...prodPlugin
    ]
};
