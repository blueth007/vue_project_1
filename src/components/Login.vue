<template>
    <div class="login_container">
        <h2>登陆组件</h2>
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="avatar" />
            </div>
            <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                label-width="100px"
                class="login_form"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model.trim="loginForm.username"
                        autocomplete="off"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密  码" prop="password">
                    <el-input
                        type="password"
                        v-model.trim="loginForm.password"
                        autocomplete="off"
                        prefix-icon="el-icon-key"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="ver_code">
                    <el-input v-model.number="loginForm.ver_code" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox
                        label="记住密码"
                        v-model="loginForm.rememberOn"
                        name="rememberOn"
                    ></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    props: {},
    components: {},
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("验证码不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error("请输入数字值"));
                } else {
                    if (value < 18) {
                        callback(new Error("必须年满18岁"));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                password: window.localStorage.getItem("password"),
                username: window.localStorage.getItem("username"),
                ver_code: "",
                rememberOn: true
            },
            rules: {
                password: [{ validator: validatePass, trigger: "blur" }],
                username: [{ validator: validateUsername, trigger: "blur" }],
                ver_code: [{ validator: checkAge, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.loginForm);
                    this.$http.post("/login", this.loginForm).then(data => {
                        const res = data.data;
                        // console.log("服务器返回数据:",res)
                        //记住用户名和密码
                        if (this.loginForm.rememberOn) {
                            SetRemember("username", this.loginForm.username);
                            SetRemember("password", this.loginForm.password);
                        } else {
                            ClearRemember("username");
                            ClearRemember("password");
                        }

                        if (res.code == 1) {
                            this.$message({
                                message: "恭喜你登陆成功",
                                type: "success",
                                center: true
                            });
                            window.sessionStorage.setItem("token", res.token);
                            this.$router.push("/home");
                        } else {
                            this.$message({
                                message: "登陆失败",
                                type: "error",
                                center: true
                            });
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};

function SetRemember(key, value) {
    window.localStorage.setItem(key, value);
}

function ClearRemember(key) {
    window.localStorage.removeItem(key);
}
</script>
<style lang="scss" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    h2 {
        text-align: center;
        color: #fff;
    }
    .login_box {
        width: 450px;
        height: 430px;
        border-radius: 5px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    $avatarShadowColor: rgb(161, 161, 161, 0.5);
    .avatar_box {
        position: absolute;
        left: 50%;
        bottom: 100%;

        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 1px solid silver;
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        transform: translate(-50%, 50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .login_form {
        position: absolute;
        bottom: 0;
        width: 365px;
    }
}
</style>
