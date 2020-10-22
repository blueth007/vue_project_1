<template>
    <div class=" ">
        <!-- <h2>{{ data.mg_name }}编辑</h2> -->
        <p v-if="type == 'Edit'">实践操作需根据id获取最新data来填充数据</p>
        <el-form
            ref="edituserForm"
            label-position="right"
            label-width="80px"
            :model="row"
            :rules="rules"
        >
            <el-form-item label="用户名" prop="mg_name">
                <el-input v-if="type == 'Edit'" disabled v-model="row.mg_name"></el-input>
                <el-input v-else v-model="row.mg_name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mg_mobile">
                <el-input v-model="row.mg_mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mg_email">
                <el-input v-model="row.mg_email"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role_id">
                <el-input v-model="row.role_id"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="mg_state">
                <el-switch v-model="row.mg_state"></el-switch>
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
    props: { data: Object, oncancel: Function, onsave: Function, type: String },
    data() {
        //自定义校验form函数
        var checkMoblie = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号"));
            } else {
                const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

                if (regMobile.test(value)) {
                    return callback();
                }

                callback(new Error("请输入合法的手机号"));
            }
        };
        var checkEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入非空邮箱"));
            } else {
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

                if (regEmail.test(value)) {
                    // 合法的邮箱
                    return callback();
                }
                callback(new Error("请输入合法的邮箱"));
            }
        };

        var tempData = { ...this.data };
        if (this.type == "Add") {
            tempData = {
                mg_name: "",
                role_id: "",
                mg_mobile: "",
                mg_email: "",
                mg_state: false
            };
        }
        return {
            row: { ...tempData },
            rules: {
                mg_name: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 5, max: 13, message: "长度在 5 到13 个字符", trigger: "blur" }
                ],
                mg_mobile: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { validator: checkMoblie, trigger: "blur" }
                ],
                mg_email: [
                    { required: true, message: "请输入正确邮箱", trigger: "blur" },
                    { validator: checkEmail, trigger: "blur" }
                ],
                role_id: [{ required: true, message: "请输入角色", trigger: "blur" }]
            }
        };
    },
    watch: {
        data: function(newVal) {
            console.log("New Props ", newVal);
            this.row = { ...newVal };
        }
    },
    computed: {},
    methods: {
        //
        handleCancle() {
            console.log("editpr cancel");
            this.$refs.edituserForm.resetFields();

            this.$emit("oncancel");
        },
        handleSave() {
            console.log("editpr save");
            this.$emit("onsave", this.row);
        }
    },
    created() {
        //根据data.id 重新获取最新的数据再绑定
    },
    mounted() {
        console.log("MOUNT");
    }
};
</script>
<style lang="" scoped></style>
