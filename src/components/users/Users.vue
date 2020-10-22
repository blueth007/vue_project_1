<template>
    <div class="users_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="22">
                <el-col :span="8">
                    <el-input placeholder="请输入查询内容" v-model="queryInfo.query" clearable>
                        <el-button
                            type="primary"
                            slot="append"
                            icon="el-icon-search"
                            @click="getUsers()"
                            >搜索</el-button
                        >
                    </el-input>
                </el-col>
                <el-col :span="16"
                    ><el-button @click="addUser()" type="primary">添加用户</el-button></el-col
                >
            </el-row>
            <template>
                <el-table :data="userlist" border stripe style="width: 100%">
                    <el-table-column
                        type="index"
                        width="60px"
                        label="序号"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="mg_name" label="姓名" width="120px" align="center">
                    </el-table-column>
                    <el-table-column prop="mg_email" label="邮件" width="180px" align="center">
                    </el-table-column>
                    <el-table-column prop="mg_mobile" label="电话" width="180px" align="center">
                    </el-table-column>
                    <el-table-column prop="role_id" label="角色" width="120px" align="center">
                    </el-table-column>
                    <el-table-column label="状态" width="100px" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" disabled> </el-switch>
                        </template>
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
            </template>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :background="true"
            >
            </el-pagination>
        </el-card>
        <el-dialog
            title="编辑框"
            :visible.sync="editorDalog.isVisible"
            width="50%"
            @close="handleDialogClose"
        >
            <EditUser
                :type="editorDalog.type"
                :data="editorDalog.editRow"
                @oncancel="handleDialogClose"
                @onsave="handleDialogEnter"
            ></EditUser>
        </el-dialog>
    </div>
</template>

<script>
import EditUser from "./EditUser.vue";
export default {
    name: "Users",
    components: { EditUser },
    props: {},
    data() {
        return {
            queryInfo: {
                query: "",
                pagenum: 1,
                pagesize: 2
            },
            editorDalog: {
                editRow: {},
                type: "Edit",
                isVisible: false
            },
            userlist: [],
            total: 0
        };
    },
    watch: {},
    computed: {},
    methods: {
        getUsers() {
            this.$http.post("/users", this.queryInfo).then(data => {
                console.log(data.data);
                const res = data.data;
                if (res.code != 0) {
                    return this.$message.error("获取用户信息失败");
                }
                this.userlist = res.data;
                this.total = res.total;
            });
        },
        addUser() {
            console.log("new");
            this.editorDalog.isVisible = true;
            this.editorDalog.type = "Add";
        },
        handleEdit(row) {
            console.log(row);
            this.editorDalog.editRow = row;
            this.editorDalog.type = "Edit";
            this.editorDalog.isVisible = true;
        },
        handleDelete(row) {
            console.log(row);
            this.userlist = this.userlist.filter(el => el.mg_id != row.mg_id);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.queryInfo.pagesize = val;
            this.getUsers();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.queryInfo.pagenum = val;
            this.getUsers();
        },
        handleDialogClose() {
            console.log("close X");
            this.editorDalog.editRow = {};

            this.editorDalog.isVisible = false;
        },
        handleDialogEnter(val) {
            console.log("点击确定返回值", val);
            if (this.editorDalog.type == "Add") {
                this.userlist.push(val);
            }

            this.userlist = this.userlist.map(el => {
                if (el.mg_id == val.mg_id) {
                    return val;
                }
                return el;
            });

            this.editorDalog.isVisible = false;
        }
    },
    created() {
        this.getUsers();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-row {
    margin: 10px 0;
}
.el-card {
    margin-top: 20px;
    min-width: 1024px;
}
.el-pagination {
    margin-top: 10px;
}
</style>
