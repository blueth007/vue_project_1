<template>
    <div class="goods_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="8"> </el-col>
            <el-col :span="16">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    @click="addDialogVisible = true"
                    >添加分类</el-button
                >
            </el-col>
        </el-row>
        <el-table
            :data="cateLists"
            border
            lazy
            stripe
            row-key="cat_id"
            style="width: 100%"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="cat_name" label="分类名称" align="center"> </el-table-column>
            <el-table-column prop="cat_deleted" label="是否有效" align="center">
                <template slot-scope="scopeProp">
                    <i
                        v-if="!scopeProp.row.cat_deleted"
                        class="el-icon-success bgColor"
                        size="mini"
                    ></i>
                    <i v-else class="el-icon-error" size="mini"></i>
                </template>
            </el-table-column>
            <el-table-column prop="cat_level" label="等级" align="center">
                <template slot-scope="scopeProp">
                    <el-tag v-if="scopeProp.row.cat_level == 0">一级</el-tag>
                    <el-tag v-else-if="scopeProp.row.cat_level == 1" type="success">二级</el-tag>
                    <el-tag v-else-if="scopeProp.row.cat_level == 2" type="danger">三级</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
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
            title="编辑分类"
            :visible.sync="editDialogVisible"
            width="80%"
            :before-close="handleClose"
        >
            <el-form :model="editor" label-width="100px">
                <el-form-item label="分类名称" required>
                    <el-input v-model="editor.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="添加分类"
            :visible.sync="addDialogVisible"
            width="80%"
            :before-close="handleClose"
        >
            <el-form :model="addtor" label-width="100px">
                <el-form-item label="分类名称" required>
                    <el-input v-model="addtor.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader
                        v-model="addtor.cat_desc"
                        :options="addtor.cat_list"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Categories",
    components: {},
    props: {},
    data() {
        return {
            cateLists: [],
            editDialogVisible: false,
            editor: {},
            addDialogVisible: false,
            addtor: { cat_name: "", cat_desc: "", cat_list: [] },
            total: 0,
            queryInfo: {
                type: 2,
                pagenum: 1,
                pagesize: 5
            }
        };
    },
    watch: {},
    computed: {},
    methods: {
        getLists() {
            this.$http.get("/categories", { params: this.queryInfo }).then(resp => {
                const data = resp.data;
                console.log(data);
                if (data.code == 1) {
                    this.cateLists = data.data;
                    this.total = data.total;
                    this.addtor.cat_list = this.getOptions(data.data);
                    console.log(this.addtor.cat_list);
                }
            });
        },
        handleEdit(val) {
            this.editDialogVisible = true;
            this.editor = { ...val };
        },
        editSubmit() {
            alert(JSON.stringify(this.editor));
        },
        addSubmit() {
            this.addDialogVisible = false;
            alert(JSON.stringify(this.addtor.cat_desc + " 序列改名为: " + this.addtor.cat_name));
        },
        handleClose() {
            this.editDialogVisible = false;
            this.addDialogVisible = false;
        },
        handleChange(val) {
            this.addtor.cat_desc = val;
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
        handlePageSizeChange(val) {
            this.queryInfo.pagesize = val;
            this.getLists();
        },
        handlePageCurrentChange(val) {
            this.queryInfo.pagenum = val;
            this.getLists();
        }
    },
    created() {
        this.getLists();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-row {
    margin: 10px 0;
}
.bgColor {
    color: lawngreen;
}
</style>
