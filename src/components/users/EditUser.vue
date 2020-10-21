<template>
    <div class=" ">
        Editor
        {{ data }}
        <el-form ref="edituserForm" label-position="right" label-width="80px" :model="data">
            <el-form-item label="用户名">
                <el-input v-model="data.mg_name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="data.mg_mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="data.mg_email"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-input v-model="data.role_id"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch v-model="data.mg_state"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSave()">提交</el-button>
                <el-button @click="handleCancle()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "EditUser",
    components: {},
    props: { data: Object, oncancel: Function, onsave: Function },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        handleCancle() {
            console.log("editpr cancel");
            this.$emit("oncancel");
        },
        handleSave() {
            console.log("editpr save");
            this.$emit("onsave", this.data);
        }
    },
    created() {},
    mounted() {
        console.log("MOUNT");
    }
};
</script>
<style lang="" scoped></style>
