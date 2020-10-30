//自定义 Vue 的全局函数
exports.install = function(Vue) {
    Vue.prototype.text1 = function() {
        //全局函数1
        alert("执行成功1");
    };
    Vue.prototype.getFormatTime = function(fmt, date) {
        //除了 月份MM 其他全是小写字符
        if (Object.prototype.toString.call(date) == "[object String]") {
            date = new Date(date);
        }
        if (Object.prototype.toString.call(date) == "[object Number]") {
            date = new Date(date);
        }
        //新增默认格式
        fmt = fmt ? fmt : "yyyy-MM-dd hh:mm:ss ";
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
                );
        return fmt;
    };
};
