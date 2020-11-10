<template>
    <div class="orders_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="22">
                <el-col :span="8">
                    <el-input placeholder="请输入查询内容" v-model="queryInfo.queryName" clearable>
                        <el-button
                            type="primary"
                            slot="append"
                            icon="el-icon-search"
                            @click="getOrders()"
                            >搜索</el-button
                        >
                    </el-input>
                </el-col>
            </el-row>
            <template>
                <el-table :data="orderlist" border stripe style="width: 100%">
                    <el-table-column
                        type="index"
                        width="60px"
                        label="序号"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="order_number" label="订单编号" width="240px">
                    </el-table-column>
                    <el-table-column
                        prop="order_price"
                        label="订单价格"
                        width="180px"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="order_pay" label="是否付款" width="140px" align="center">
                        <template slot-scope="Scope">
                            <el-tag v-if="Scope.row.order_pay != 0" size="mini" effect="dark">
                                已付款
                            </el-tag>
                            <el-tag v-else size="mini" effect="dark" type="danger">未付款</el-tag>
                            <el-tag
                                v-if="Scope.row.order_pay == 1"
                                effect="dark"
                                type="success"
                                size="mini"
                                >支付宝
                            </el-tag>
                            <el-tag
                                v-else-if="Scope.row.order_pay == 2"
                                size="mini"
                                effect="dark"
                                type="success"
                            >
                                微信
                            </el-tag>
                            <el-tag
                                v-else-if="Scope.row.order_pay == 3"
                                size="mini"
                                effect="dark"
                                type="success"
                            >
                                银行卡
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_send" label="是否发货" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="下单时间"
                        width="220px"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{ getFormatTime("yyyy-MM-dd hh:mm:ss", scope.row.create_time) }}
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <el-tooltip
                                :enterable="false"
                                class="item"
                                effect="dark"
                                content="修改地址"
                                placement="top"
                            >
                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    @click="handleEdit(scope.row)"
                                >
                                </el-button
                            ></el-tooltip>
                            <el-tooltip
                                :enterable="false"
                                class="item"
                                effect="dark"
                                content="物流详情"
                                placement="top"
                            >
                                <el-button
                                    size="mini"
                                    type="success"
                                    icon=" el-icon-truck"
                                    @click="handleTransportOpen(scope.row)"
                                ></el-button>
                            </el-tooltip>
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="handleDelete(scope.row)"
                            >
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 5, 10, 50]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :background="true"
            >
            </el-pagination>
        </el-card>
        <el-dialog
            title="编辑框"
            :visible.sync="editorDialog.isVisible"
            width="70%"
            @close="handleDialogClose"
        >
            <el-form label-width="150px" :model="editorDialog.editRow">
                <el-form-item label="省市区/县" required>
                    <el-cascader
                        v-model="editorDialog.editRow.province"
                        :options="provinceCities"
                        @change="handleSelectChange"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址(街道/门牌)" required>
                    <el-input v-model.trim="editorDialog.editRow.consignee_addr"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-row>
                        <el-col :span="8" :offset="14">
                            <el-button @click="handleDialogClose">取消</el-button>
                            <el-button type="primary" @click="handleDialogSubmit">确定</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="物流信息"
            :visible.sync="transportation.isVisible"
            width="70%"
            @close="handleTransportClose"
        >
            <div class="kuaidi-timeline">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in transportation.activities"
                        :key="index"
                        :icon="activity.location ? 'el-icon-location' : ''"
                        :color="
                            activity.location ? 'red' : activity.time == '' ? '#eee' : '#409eff'
                        "
                        :type="index == 0 ? 'primary' : 'success'"
                        :size="activity.location ? 'large' : 'normal'"
                        :timestamp="activity.time"
                    >
                        {{ activity.context }}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <el-row>
                <el-col :span="8" :offset="14">
                    <el-button @click="handleTransportClose">取消</el-button>
                    <el-button type="primary" @click="handleTransportClose">确定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
//支付方式 0 未支付 1 支付宝 2 微信 3 银行卡
//数据太大 需要网络请求
//import cities from "./cities.json";

export default {
    name: "Orders",
    components: {},
    props: {},
    data() {
        return {
            queryInfo: {
                queryName: "",
                pagenum: 1,
                pagesize: 5
            },
            editorDialog: {
                editRow: {
                    consignee_addr: "",
                    province: []
                },

                isVisible: false
            },
            transportation: {
                isVisible: false,
                activities: []
            },
            provinceCities: [],
            orderlist: [],
            total: 0
        };
    },
    watch: {},
    computed: {},
    methods: {
        getOrders() {
            let loading = this.$loading({
                target: ".el-main",
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            this.$http.get("/orders", { params: this.queryInfo }).then(rest => {
                const result = rest.data;
                loading.close();
                if (result.code == 1) {
                    this.orderlist = result.data;
                    this.total = result.total;
                } else this.$message.error("获取数据失败");
            });
        },
        handleEdit(val) {
            this.editorDialog.isVisible = true;
            this.editorDialog.editRow = { ...val };
        },
        handleDelete(val) {
            this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!" + JSON.stringify(val)
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        message: "已取消删除"
                    });
                });
        },
        handleSizeChange(val) {
            //  console.log(`每页 ${val} 条`);
            this.queryInfo.pagesize = val;
            this.getOrders();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.queryInfo.pagenum = val;
            this.getOrders();
        },
        handleDialogClose() {
            this.editorDialog.isVisible = false;
        },
        handleDialogSubmit() {
            this.editorDialog.isVisible = false;
            this.$message({
                type: "success",
                message: "添加成功!" + JSON.stringify(this.editorDialog.editRow)
            });
        },
        handleSelectChange(val) {
            console.log(val);
        },
        handleTransportClose() {
            this.transportation.isVisible = false;
            this.transportation.activities = [];
        },
        handleTransportOpen(val) {
            let loading = this.$loading({
                target: ".kuaidi-timeline",
                text: "Loading",
                spinner: "el-icon-loading"
            });

            console.log(val);
            this.$http.get("/kuaidi", { params: { kdId: "" } }).then(rest => {
                const result = rest.data;
                if (result.code == 1) {
                    this.transportation.activities = result.data;
                    loading.close();
                    this.transportation.isVisible = true;
                } else {
                    this.$message.error("获取数据失败");
                }
            });
        }
    },
    created() {
        this.getOrders();
        let arr = [];
        this.$http.get("/cities").then(rest => {
            const cities = rest.data;

            cities.provinces.province.map(pro => {
                let p1 = {
                    label: pro.ssqname,
                    value: pro.ssqname
                };
                if (pro.cities) {
                    p1.children = [];
                    pro.cities.city.map(ct => {
                        let p2 = {
                            label: ct.ssqname,
                            value: ct.ssqname
                        };
                        if (ct.areas) {
                            p2.children = [];
                            p2.children = ct.areas.area.map(ar => {
                                return {
                                    label: ar.ssqname,
                                    value: ar.ssqname
                                };
                            });
                        }
                        p1.children.push(p2);
                    });
                }
                arr.push(p1);
            });
        });
        this.provinceCities = arr;
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-row,
.el-table {
    margin: 10px 0;
    tr {
        .el-tag {
            margin-right: 5px;
        }
    }
}
.kuaidi-timeline {
    position: relative;
}
.el-cascader {
    width: 100%;
}
</style>
