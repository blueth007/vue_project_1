# vue_project_1

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

eslint 和 vetur 冲突配置
.prettierrc
{
// 超过最大值换行
"printWidth": 200,
// 让 prettier 使用 eslint 的代码格式进行校验
"eslintIntegration": true,
// 让 prettier 使用 stylelint 的代码格式进行校验
"stylelintIntegration": true,
// tab 键宽度，默认为 2
"tabWidth": 4,
// 行末加分号
"semi": true,
// 用单引号代替双引号
"singleQuote": true,
// 对象&数组是否追加空格
// e.g. false: {foo:bar}
// true: { foo: bar }
"bracketSpacing": true,
// 箭头函数参数括号 默认 avoid 可选 avoid | always
// avoid 能省略括号的时候就省略 例如 x => x
// always 总是有括号
"arrowParens": "avoid"
}
setting.json 附加
{
// vetur 的自定义设置////
"vetur.validation.template": true,
//配置 ESLint 检查的文件类型
"eslint.validate": [
"javascript",
"javascriptreact",
"vue"
],
//保存自动格式化
"editor.tabSize": 4,
"vetur.format.options.tabSize": 4, //四格缩进
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
//保存时 eslint 自动修复错误
"source.fixAll.eslint": true
}
}
