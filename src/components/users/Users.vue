<template>
    <div class="users_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "Users",
    components: {},
    props: {},
    data() {
        return {
            queryInfo: {
                query: "",
                pagenum: 1,
                pagesize: 2
            },
            userlist: []
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
            });
        }
    },
    created() {
        this.getUsers();
    },
    mounted() {}
};
</script>
<style lang="" scoped></style>
