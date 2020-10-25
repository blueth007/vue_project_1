<template>
    <div class="">
        <el-form :model="formData" ref="editRoleForm" label-width="120px">
            <el-form-item label="角色名称:" required>
                <el-input v-model.trim="formData.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述:" required>
                <el-input v-model.trim="formData.roleDesc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleCancel()">取消</el-button>
                <el-button type="primary" @click="handleSubmit()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "EditDialog",
    props: ["data", "type"],
    components: {},
    data() {
        var initData = { ...this.data };
        if (this.type == "Add") {
            initData.roleName = "";
            initData.roleDesc = "";
        }
        return {
            formData: initData
        };
    },
    computed: {},
    watch: {
        data: function(newVal) {
            console.log("New Props ", newVal);
            this.formData = { ...newVal };
        }
    },
    methods: {
        resetForm() {
            this.$refs.editRoleForm.resetFields();
        },
        handleCancel() {
            this.resetForm();
            this.$emit("oncancel");
        },
        handleSubmit() {
            this.$emit("onsave", this.formData);
            this.resetForm();
        }
    },
    created() {},
    mounted() {},
    beforeDestroy() {}
};
</script>
<style lang="scss" scoped></style>
