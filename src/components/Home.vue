<template>
    <el-container class="home_container">
        <!-- 头部区域 -->
        <el-header>
            <div class="logo_container">
                <img src="../assets/yplogo.png" alt="yp" /> <strong>后台</strong>
            </div>
            <el-button type="" size="mini" @click="logout()">退出登录</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <h2 @click="toggleCollapse()">
                    <i class="el-icon-s-unfold" v-if="isCollapse"></i
                    ><i class="el-icon-s-fold" v-if="!isCollapse"></i>
                </h2>
                <el-menu
                    unique-opened
                    background-color="slategrey"
                    text-color="#fff"
                    active-text-color="#409bfe"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :default-active="defalutPath"
                    router
                >
                    <el-submenu :index="item.id + ''" :key="item.id" v-for="item in menulist">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.authName }}</span>
                        </template>
                        <el-menu-item
                            :index="val.path"
                            v-for="val in item.children"
                            :key="val.id"
                            @click="saveNavState(val.path)"
                        >
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{ val.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 主体区域 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- 底部区域 -->
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
export default {
    name: "Home",
    props: {},
    components: {},
    data() {
        return {
            menulist: [],
            isCollapse: false,
            defalutPath: "",
            openMenus: []
        };
    },
    computed: {},
    watch: {
        $route(to) {
            // console.log(to.path, from.path);
            if (to.path == "/welcome") {
                this.defalutPath = "";
                // window.sessionStorage.setItem("NavState", "");
                return false;
            }
            this.defalutPath = to.path;
        }
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        getMenuList() {
            this.$http.get("/menu").then(rest => {
                const data = rest.data;
                // console.log(data);
                if (data.code !== 1) {
                    this.$message({
                        type: "error",
                        message: data.msg
                    });
                } else {
                    this.menulist = data.data;
                }
            });
        },
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        saveNavState(path) {
            this.defalutPath = path;
            // window.sessionStorage.setItem("NavState", path);
        },
        foldSubMenu() {} //折叠所有menu面板
    },
    created() {
        this.getMenuList();
        // this.defalutPath = window.sessionStorage.getItem("NavState");
    },
    mounted() {
        this.defalutPath = this.$route.path;
    },
    beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
.home_container {
    height: 100%;
}
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-aside {
    background-color: slategrey;
    h2 {
        text-align: center;
        margin: 0;
        padding: 5px;
        background-color: #eee;
    }
    .el-menu {
        border-right: 0;
    }
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo_container {
        height: 100%;
        display: flex;
        align-items: center;
        img {
            height: 100%;
        }
    }
}
</style>
