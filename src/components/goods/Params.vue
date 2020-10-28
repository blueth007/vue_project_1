<template>
    <div class="goods_container">
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>参数列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="12">
                    选择商品分类:
                    <el-cascader
                        v-model="selector.value"
                        :options="selector.list"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"
                    ></el-cascader>
                </el-col>
            </el-row>

            <el-tabs v-model="tabPanel.activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="一级管理" name="first">
                    <el-table :data="tabTable" border stripe style="width: 100%">
                        <el-table-column
                            type="index"
                            width="120px"
                            label="序号"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="参数名称" align="center">
                            <el-input v-model="tabTable.cat_name"></el-input>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
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
                </el-tab-pane>
                <el-tab-pane label="二级管理" name="second" :disabled="selector.value.length < 2">
                    <el-table :data="tabTable" border stripe style="width: 100%">
                        <el-table-column
                            type="index"
                            width="120px"
                            label="序号"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="参数名称" align="center">
                            <el-input v-model="tabTable.cat_name"></el-input>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
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
                </el-tab-pane>

                <el-tab-pane label="三级管理" name="third" :disabled="selector.value.length < 3">
                    <el-table :data="tabTable" border stripe style="width: 100%">
                        <el-table-column
                            type="index"
                            width="120px"
                            label="序号"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="参数名称" align="center">
                            <el-input v-model="tabTable.cat_name"></el-input>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
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
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Params",
    components: {},
    props: {},
    data() {
        return {
            selector: {
                value: "",
                list: []
            },
            tabPanel: {
                activeName: "first"
            },
            tabTable: []
        };
    },
    watch: {},
    computed: {},
    methods: {
        getList() {
            this.$http
                .get("/categories", { params: { type: 2, pagenum: 1, pagesize: 10 } })
                .then(resp => {
                    const result = resp.data;
                    if (result.code == 1) {
                        this.selector.list = this.getOptions(result.data);
                    }
                });
        },
        getOptions(arr) {
            return arr.map(params => {
                let temp = {
                    value: params.cat_id,
                    label: params.cat_name
                };
                if (!params.children) {
                    return temp;
                }
                temp.children = this.getOptions(params.children);
                return temp;
            });
        },
        handleChange(val) {
            this.selector.value = val;
            console.log(val);
        },
        //tabs 标签点击事件
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    created() {
        this.getList();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-row {
    margin: 20px 0;
}
</style>
