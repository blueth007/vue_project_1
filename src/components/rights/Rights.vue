<template>
    <div class="rights_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <p>展示权限列表等级</p>
        <template>
            <el-table
                :data="lists"
                border
                style="width: 100%"
                :default-sort="{ prop: 'level', order: 'ascending' }"
            >
                <el-table-column type="index" width="50" label="序号"> </el-table-column>
                <el-table-column prop="authName" label="权限名称" sortable> </el-table-column>
                <el-table-column prop="path" label="路径" sortable> </el-table-column>
                <el-table-column prop="level" label="权限等级" sortable>
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level == 0" type=" ">
                            一级权限
                        </el-tag>
                        <el-tag v-if="scope.row.level == 1" type="success">
                            二级权限
                        </el-tag>
                        <el-tag v-if="scope.row.level == 2" type="warning">
                            三级权限
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
export default {
    name: "Rights",
    components: {},
    props: {},
    data() {
        return {
            lists: []
        };
    },
    watch: {},
    computed: {},
    methods: {
        getLists() {
            this.$http.get("/rightlists").then(res => {
                const data = res.data;
                console.log(data);
                if (data.meta.status == 200) {
                    this.lists = data.data;
                }
            });
        }
    },
    created() {
        this.getLists();
    },
    mounted() {}
};
</script>
<style lang="" scoped></style>
