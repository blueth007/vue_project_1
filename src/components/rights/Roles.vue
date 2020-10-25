<template>
    <div class="rights_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="addRole()">添加角色</el-button>
        <el-dialog
            title="编辑框"
            :visible.sync="editorDalog.isVisible"
            width="50%"
            @close="handleDialogClose"
        >
            <EditRights
                ref="child"
                :type="editorDalog.type"
                :data="editorDalog.editRow"
                @oncancel="handleDialogClose"
                @onsave="handleDialogEnter"
            ></EditRights>
        </el-dialog>
        <el-card>
            <template>
                <el-table :data="rolesList" border style="width: 100%">
                    <el-table-column type="expand" width="120px">
                        <template slot="header">
                            <el-button size="mini" @click="handleHeader()">
                                <i class="el-icon-upload2"></i
                            ></el-button>
                        </template>
                        <template slot-scope="props">
                            <el-row :gutter="22" v-for="item in props.row.children" :key="item.id">
                                <!-- 一级菜单 -->
                                <el-col :span="5">
                                    <el-tag
                                        effect="dark"
                                        closable
                                        @close="handleDeleteItem(props.row, item.id)"
                                    >
                                        {{ item.authName }}
                                    </el-tag>
                                    <i class="el-icon-caret-right" size="mini"></i>
                                </el-col>
                                <!-- 二级菜单 -->
                                <el-col :span="19">
                                    <el-row v-for="item1 in item.children" :key="item1.id">
                                        <el-col :span="6">
                                            <el-tag
                                                type="success"
                                                closable
                                                effect="dark"
                                                @close="handleDeleteItem(props.row, item1.id)"
                                            >
                                                {{ item1.authName }}
                                            </el-tag>
                                            <i class="el-icon-caret-right" size="mini"></i
                                        ></el-col>
                                        <!-- 三级菜单 -->
                                        <el-col :span="18">
                                            <el-tag
                                                closable
                                                type="warning"
                                                effect="dark"
                                                v-for="item2 in item1.children"
                                                :key="item2.id"
                                                @close="handleDeleteItem(props.row, item2.id)"
                                            >
                                                {{ item2.authName }}
                                            </el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="index"
                        width="120px"
                        label="序号"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="roleName" label="角色名称"> </el-table-column>
                    <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
                    <el-table-column label="操作" align="center" width="350px">
                        <template slot-scope="slotScope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEditDialog(slotScope.row)"
                                ><i class="el-icon-edit">编辑</i>
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDeleteItem(slotScope.row, slotScope.row.rid)"
                                ><i class="el-icon-delete">删除</i>
                            </el-button>
                            <el-button size="mini" type="warning">
                                <i class="el-icon-el-icon-set-up" @click="setRights(slotScope.row)">
                                    分配权限
                                </i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <!-- //权限分配对话框 -->
        <el-dialog :visible.sync="treeDialog.isVisible" width="50%" @close="handleCloseTree">
            <el-tree
                highlight-current
                default-expand-all
                :data="treeDialog.treedata"
                show-checkbox
                node-key="id"
                :props="treeDialog.defaultTreeProps"
                ref="rightsTree"
                :default-checked-keys="treeDialog.treeCheck"
            >
            </el-tree>
            <el-row>
                <el-col :span="18"></el-col>
                <el-col>
                    <el-button size="small" @click="handleCloseTree()">取消</el-button>
                    <el-button size="small" type="primary" @click="getAllRights()">提交</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import EditRights from "./EditRights";
export default {
    name: "Roles",
    components: { EditRights },
    props: {},
    data() {
        return {
            expands: ["89"],
            editorDalog: {
                editRow: {},
                type: "Edit",
                isVisible: false
            },
            treeDialog: {
                editId: 0,
                isVisible: false,
                treedata: [],
                treeCheck: [],
                defaultTreeProps: {
                    children: "children",
                    label: "authName"
                }
            },

            rolesList: [],
            expandsAll: []
        };
    },
    watch: {},
    computed: {},
    methods: {
        getRowKey(row) {
            return row.rid + "";
        },
        getRoles() {
            this.$http("/roles").then(result => {
                const data = result.data;
                if (data.code == 1) {
                    {
                        this.rolesList = data.data;
                        this.expandsAll = data.data.map(el => el.rid + "");
                    }
                } else this.$message.error("获取数据失败");
                console.log(this.rolesList);
            });
        },
        getLeafTree(node, arr) {
            if (!node.children) {
                return arr.push(node.id);
            }
            node.children.forEach(el => {
                this.getLeafTree(el, arr);
            });
        },
        addRole() {
            this.editorDalog.editRow = {};
            this.editorDalog.isVisible = true;
        },
        handleEditDialog(val) {
            this.editorDalog.editRow = { ...val };
            this.editorDalog.isVisible = true;
        },
        handleDeleteDialog(val) {
            console.log("DELETE:", val);
        },
        handleDialogClose() {
            this.editorDalog.isVisible = false;
            this.$refs.child.resetForm(); //调用子函数的方法
        },
        handleDialogEnter(value) {
            console.log("提交返回的数据", value);
            this.editorDalog.isVisible = false;
        },
        handleHeader() {
            //表头点击

            console.log("没有找到取消嵌套row-key的函数,属性会遍历全部的对象返回不需要的子属性id");
        },
        handleDeleteItem(role, id) {
            //根据不同级别的id进行过滤删除,post远程请求
            this.$message({ message: "建议通过axios远程请求修改数据,再次只是进行本地处理" });
            if (role.rid == id) {
                this.rolesList = this.rolesList.filter(el => el.rid != id);
            } else {
                var lv1 = role.children;

                lv1.some(a => {
                    if (a.id == id) {
                        lv1 = lv1.filter(aa => aa.id !== id);
                        return true;
                    } else {
                        let lv2 = a.children;

                        lv2.some(b => {
                            if (b.id == id) {
                                lv2 = lv2.filter(bb => bb.id != id);
                                return true;
                            } else {
                                let lv3 = b.children;
                                lv3 = lv3.filter(el => el.id != id);
                                b.children = lv3;
                            }
                        });
                        a.children = lv2;
                    }
                });
                role.children = lv1;
            }
        },
        setRights(val) {
            this.$http.get("/rights").then(res => {
                if (res.data.code == 1) {
                    this.treeDialog.treedata = res.data.data;
                    //console.log(res.data, tem);
                } else this.$message.error("获取数据失败!!!");
            });
            this.treeDialog.isVisible = true;
            var tem = [];
            this.getLeafTree(val, tem);
            this.treeDialog.treeCheck = tem;
            this.treeDialog.editId = val.rid;
        },

        //获取分配权限树的值
        getAllRights() {
            const arr = this.$refs.rightsTree.getCheckedNodes(false, true);
            // var newV = arr.filter(item => item.pid == 0);
            this.rolesList = this.rolesList.map(ele => {
                if (ele.rid == this.treeDialog.editId) {
                    ele.children = arr.filter(item => item.pid == 0);
                }
                return ele;
            });
            this.$message.success(
                "需要post远程服务器后端进行数组CURD,并重新获取新的权限来完成渲染"
            );
            this.handleCloseTree();
        },
        handleCloseTree() {
            this.$refs.rightsTree.setCheckedKeys([]);
            this.treeDialog.isVisible = false;
        }
    },
    created() {
        this.getRoles();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.el-button {
    margin: 12px 20px;
}
.el-row {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-col {
        padding: 10px;
        text-align: center;
        .el-tag {
            margin: 10px;
        }
        .el-icon-caret-right {
            margin-left: -10px;
        }
    }
}
</style>
