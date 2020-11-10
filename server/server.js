const express = require("express");
const app = express();

//添加gzip压缩
const compression = require("compression");
app.use(compression());

//托管静态服务器
app.use(express.static("../dist"));

app.listen(8081, () => {
    console.log("Web server is running ....... at port : 8081 ");
});
