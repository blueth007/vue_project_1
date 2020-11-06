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
                        :props="{ expandTrigger: 'hover', checkStrictly: true }"
                        @change="handleChange"
                    ></el-cascader>
                </el-col>
            </el-row>

            <el-tabs v-model="tabPanel.activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="一级管理" name="first">
                    <el-row>
                        <el-button type="primary" @click="openDialog()">添加一级参数</el-button>
                    </el-row>
                    <el-table
                        :data="tabTable_1"
                        border
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                            type="index"
                            width="120px"
                            label="序号"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="参数名称" prop="cat_name" align="center">
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
                <el-tab-pane
                    label="二级管理"
                    name="second"
                    :disabled="
                        selector.value.length !== 1 &&
                            selector.value.length !== 2 &&
                            selector.value.length !== 3
                    "
                >
                    <el-row>
                        <el-button type="primary" @click="openDialog()">添加二级参数</el-button>
                    </el-row>
                    <el-table
                        :data="tabTable_2"
                        border
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                            type="index"
                            width="120px"
                            label="序号"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="参数名称" prop="cat_name" align="center">
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

                <el-tab-pane
                    label="三级管理"
                    name="third"
                    :disabled="selector.value.length !== 2 && selector.value.length !== 3"
                >
                    <el-row>
                        <el-button type="primary" @click="openDialog()">添加三级参数</el-button>
                    </el-row>
                    <el-table
                        :data="tabTable_3"
                        border
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                            type="index"
                            width="120px"
                            label="序号"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="参数名称" prop="cat_name" align="center">
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
        <el-dialog
            title="编辑参数对话框"
            :visible.sync="paramsDialog"
            width="70%"
            :before-close="handleParamsClose"
        >
            <el-form label-width="100px" :model="tabPanel">
                <el-form-item label="参数名称" required>
                    <el-input v-model.trim="tabPanel.editValue.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleParamsClose">取 消</el-button>
                <el-button type="primary" v-if="tabPanel.type == 'add'" @click="handleParamsSubmit">
                    确 定
                </el-button>
                <el-button
                    type="primary"
                    v-else-if="tabPanel.type == 'edit'"
                    @click="handleParamsEdit"
                >
                    提 交
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Params",
    components: {},
    props: {},
    data() {
        return {
            dataList: [],
            selector: {
                value: [],
                list: []
            },
            tabPanel: {
                activeName: "first",
                editValue: {
                    cat_name: "",
                    cat_id: -1
                },
                type: "add"
            },
            tabTable_1: [],
            tabTable_2: [],
            tabTable_3: [],
            paramsDialog: false
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
                        this.dataList = result.data;
                        this.selector.list = this.getOptions(this.dataList);
                        this.getLevelList();
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
            console.log("Select change");
            this.getLevelList();
        },
        //tabs 标签点击事件
        handleClick(tab) {
            console.log(tab.name, this.tabPanel.activeName);
        },
        getLevelList() {
            this.tabTable_1 = [];
            this.tabTable_2 = [];
            this.tabTable_3 = [];
            this.dataList.map(ele => {
                let temp = { ...ele };
                delete temp.children;
                this.tabTable_1.push(temp);
                if (ele.children && ele.cat_id == this.selector.value[0]) {
                    ele.children.map(item => {
                        let tempIt = { ...item };
                        delete tempIt.children;
                        this.tabTable_2.push(tempIt);
                        if (item.children && item.cat_id == this.selector.value[1]) {
                            item.children.map(it => {
                                let lev3 = { ...it };
                                this.tabTable_3.push(lev3);
                            });
                        }
                    });
                }
            });
        },
        openDialog() {
            this.paramsDialog = true;
            this.tabPanel.type = "add";
        },
        handleEdit(val) {
            this.paramsDialog = true;
            this.tabPanel.type = "edit";
            this.tabPanel.editValue.cat_name = val.cat_name;
            this.tabPanel.editValue.cat_id = val.cat_id;
        },
        handleDelete(val) {
            alert(JSON.stringify(val));
        },
        handleParamsEdit() {
            // console.log(
            //     "editSubmit: ",
            //     this.tabPanel.editValue,
            //     this.selector.value,
            //     this.tabPanel.activeName
            // );
            this.paramsDialog = false;
            alert(JSON.stringify(this.tabPanel.editValue));
        },
        handleParamsClose() {
            this.paramsDialog = false;
            this.tabPanel.editValue.cat_name = "";
        },
        handleParamsSubmit() {
            // console.log(this.tabPanel, this.selector.value);
            switch (this.tabPanel.activeName) {
                case "first": {
                    let newAddd = {
                        cat_id: Math.floor(Math.random() * 2000) + 10000,
                        cat_name: this.tabPanel.editValue.cat_name,
                        cat_level: 0
                    };
                    this.dataList.push(newAddd);
                    this.selector.list = this.getOptions(this.dataList);
                    this.getLevelList();
                    break;
                }
                case "second": {
                    let newAddd = {
                        cat_id: Math.floor(Math.random() * 2000) + 20000,
                        cat_name: this.tabPanel.editValue.cat_name,
                        cat_level: 1
                    };
                    this.dataList.forEach(ele => {
                        if (ele.cat_id == this.selector.value[0]) {
                            if (!ele.children) ele.children = [];
                            ele.children.push(newAddd);
                        }
                    });
                    this.selector.list = this.getOptions(this.dataList);
                    this.getLevelList();
                    break;
                }
                case "third": {
                    let newAddd = {
                        cat_id: Math.floor(Math.random() * 2000) + 20000,
                        cat_name: this.tabPanel.editValue.cat_name,
                        cat_level: 2
                    };
                    this.dataList.forEach(ele => {
                        if (ele.cat_id == this.selector.value[0]) {
                            if (!ele.children) ele.children = [];
                            ele.children.map(it => {
                                if (it.cat_id === this.selector.value[1]) {
                                    if (!it.children) it.children = [];
                                    it.children.push(newAddd);
                                }
                            });
                        }
                    });
                    this.selector.list = this.getOptions(this.dataList);
                    this.getLevelList();
                    break;
                }
            }
            this.paramsDialog = false;
            this.tabPanel.editValue.cat_name = "";
        },
        tableRowClassName({ row }) {
            if (row.cat_id === this.selector.value[0]) {
                return "table-select";
            }
            if (row.cat_id === this.selector.value[1]) {
                return "table-select";
            }
            if (row.cat_id === this.selector.value[2]) {
                return "table-select";
            }
            return "";
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
