<template>
    <div class="reports_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="main" style="width: 750px;height:400px;"></div>
        </el-card>
        <div>
            <h3>参数设置:</h3>
            <img
                src="https://echarts.apache.org/zh/documents/asset/img/basic-concepts-overview/series-all-a.jpg"
                alt="echart"
            />
            <pre>
            这里 option 表示使用 json 数据格式的配置来绘制图表。步骤如下：

            标题

            为图表配置标题：

            title: {
                text: '第一个 ECharts 实例'
            }
            提示信息

            配置提示信息：

            tooltip: {},
            图例组件

            图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。

            legend: {
                data: [{
                    name: '系列1',
                    // 强制设置图形为圆。
                    icon: 'circle',
                    // 设置文本为红色
                    textStyle: {
                        color: 'red'
                    }
                }]
            }
            X 轴

            配置要在 X 轴显示的项:

            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            }
            Y 轴

            配置要在 Y 轴显示的项。

            yAxis: {}
            系列列表

            每个系列通过 type 决定自己的图表类型:

            series: [{
                name: '销量',  // 系列名称
                type: 'bar',  // 系列图表类型
                data: [5, 20, 36, 10, 10, 20]  // 系列中的数据内容
            }]
            每个系列通过 type 决定自己的图表类型：

            type: 'bar'：柱状/条形图
            type: 'line'：折线/面积图
            type: 'pie'：饼图
            type: 'scatter'：散点（气泡）图
            type: 'effectScatter'：带有涟漪特效动画的散点（气泡）
            type: 'radar'：雷达图
            type: 'tree'：树型图
            type: 'treemap'：树型图
            type: 'sunburst'：旭日图
            type: 'boxplot'：箱形图
            type: 'candlestick'：K线图
            type: 'heatmap'：热力图
            type: 'map'：地图
            type: 'parallel'：平行坐标系的系列
            type: 'lines'：线图
            type: 'graph'：关系图
            type: 'sankey'：桑基图
            type: 'funnel'：漏斗图
            type: 'gauge'：仪表盘
            type: 'pictorialBar'：象形柱图
            type: 'themeRiver'：主题河流
            type: 'custom'：自定义系列
            </pre>
        </div>
    </div>
</template>

<script>
// 基于准备好的dom，初始化echarts实例
import echarts from "echarts";
import _ from "lodash";
export default {
    name: "Reports",
    components: {},
    props: {},
    data() {
        return {
            options: {
                title: {
                    text: "用户数据"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#E9EEF3"
                        }
                    }
                },
                xAxis: [
                    {
                        boundaryGap: false
                    }
                ],
                yAxis: [{ type: "value" }],
                grid: {
                    left: "13%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                }
            }
        };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {
        var myChart = echarts.init(document.getElementById("main"));

        const defaultOptions = {
            title: {
                text: "ECharts 入门示例"
            },
            tooltip: {},
            legend: {
                data: ["销量"]
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
                {
                    name: "销量",
                    type: "line",
                    data: [5, 14, 36, 10, 10, 20]
                }
            ]
        };

        // 指定图表的配置项和数据
        this.$http.get("/reports/1").then(rest => {
            const result = rest.data;
            if (result.meta.status == 200) {
                this.options = _.merge(this.options, result.data);
                //设计对象的深度合并,需要lodash 的merge函数
                //console.log(this.options);
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(this.options);
            } else {
                this.$message.error("获取数据失败");
                myChart.setOption(defaultOptions);
            }
        });
    }
};
</script>
<style lang="scss" scoped></style>
