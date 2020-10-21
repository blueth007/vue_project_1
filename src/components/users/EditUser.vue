<template>
    <div class=" ">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
        >
            {{ row }}
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "EditUser",
    components: {},
    props: { isVisible: Boolean, row: Object },
    data() {
        return {
            dialogVisible: this.isVisible
        };
    },
    watch: {},
    computed: {},
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(() => {
                    done();
                })
                .catch(() => {});
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="scss" scoped></style>
