<template>
    <div class="goods_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <p>只有get数据 没有edit和delete远程接口</p>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入查询内容" v-model="queryInfo.search" clearable>
                    <el-button
                        type="primary"
                        slot="append"
                        icon="el-icon-search"
                        @click="getGoods()"
                        >搜索</el-button
                    >
                </el-input>
            </el-col>
            <el-col :span="16">
                <el-button @click="addGoods()" type="primary">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="goodList" border lazy stripe style="width: 100%">
            <el-table-column
                type="index"
                width="60px"
                label="序号"
                align="center"
            ></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" align="center"> </el-table-column>
            <el-table-column prop="goods_price" label="商品价格(元)" width="120px" align="center">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量(g)" width="120px" align="center">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间" align="center">
                <template slot-scope="dataTime">
                    {{ dataTime.row.add_time }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="handleEdit(scope.row)"
                    ></el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="handleDelete(scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handlePageCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :background="true"
        >
        </el-pagination>
        <el-dialog
            title="编辑框"
            :visible.sync="editorDalog.isVisible"
            width="50%"
            @close="handleDialogClose"
        >
            <EditGoods :data="editorDalog.editorData"></EditGoods>
        </el-dialog>
    </div>
</template>

<script>
import EditGoods from "./EditGoods";
export default {
    name: "Goods",
    components: { EditGoods },
    props: {},
    data() {
        return {
            queryInfo: { search: "", pagenum: 1, pagesize: 10 },
            goodList: [],
            total: 0,
            loading: true,
            editorDalog: {
                isVisible: false,
                editorData: {}
            }
        };
    },
    watch: {},
    computed: {},
    methods: {
        getGoods() {
            const loading = this.$loading({
                target: ".el-table",
                lock: true,
                fullscreen: false,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            console.log("LOAD:", loading);
            this.$http.get("/goods", { params: { ...this.queryInfo } }).then(res => {
                const result = res.data;
                console.log(result);
                if (result.code == 1) {
                    this.goodList = result.data.goods;
                    this.total = result.data.total;
                } else this.$message.error("获取数据失败");
                loading.close();
            });
        },
        addGoods() {
            console.log(this.queryInfo);
            this.editorDalog.isVisible = true;
            this.editorDalog.editorData = {};
        },
        handleEdit(val) {
            console.log(val);
            this.editorDalog.isVisible = true;
            this.editorDalog.editorData = val;
        },
        handleDelete(val) {
            console.log(val);
        },
        handlePageSizeChange(val) {
            this.queryInfo.pagesize = val;
            this.getGoods();
        },
        handlePageCurrentChange(val) {
            this.queryInfo.pagenum = val;
            this.getGoods();
        },
        //对话框函数
        handleDialogClose() {
            this.editorDalog.isVisible = false;
            this.editorDalog.editorData = {};
        }
    },
    created() {
        this.getGoods();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-table {
    margin: 15px 0;
}
</style>
