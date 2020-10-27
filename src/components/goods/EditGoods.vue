<template>
    <div class=" ">
        {{ this.data }}
        <el-form :model="editor" label-width="100px">
            <el-form-item label="商品名称">
                <el-input v-model="editor.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="editor.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量(g)">
                <el-input v-model="editor.goods_weight"></el-input>
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
    name: "EditGoods",
    components: {},
    props: { data: Object },
    data() {
        return {
            editor: { ...this.data }
        };
    },
    watch: {
        data: function(newvalue) {
            this.editor = { ...newvalue };
        }
    },
    computed: {},
    methods: {
        handleSave() {
            this.editor.upd_time = new Date() - 1;
            this.$emit("onsave", this.editor);
        },
        handleCancle() {
            this.$emit("oncancel");
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="" scoped></style>
