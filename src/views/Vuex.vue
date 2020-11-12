<template>
    <div class=" ">
        <h3>使用store.state.count获取store的值:{{ $store.state.count }}</h3>
        <button @click="handleAdd">+1</button>
        传递参数
        <button @click="handleAddN">+N(5)</button>
        <hr />
        <h3>使用mapState来获取store上的值{{ count }}</h3>
        <button @click="handleDesc">-1</button>
        mapMutations引入
        <button @click="handlesub">-1</button>
        <button @click="handlesubN">-N(-5)</button>
        <h3>异步通过action处理count的值{{ count }}</h3>
        <button @click="handleAsync">异步+1</button>
        <button @click="handleAsyncN">异步+N(5)</button>
        mapActoins引入
        <button @click="handleAsyncsub">异步+1</button>
        <button @click="handleAsyncsubN">异步+N(5)</button>
        getters的方法
        <p>{{ $store.getters.big }}</p>
        mapgetters的引入
        <p>{{ big }}</p>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
    name: "VuexExample",
    components: {},
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {
        ...mapState(["count"]), //获取store->state-->count的值
        ...mapGetters(["big"])
    },
    methods: {
        ...mapMutations(["sub", "subN"]),
        ...mapActions(["AsyncAdd", "AsyncAddN"]),
        handleAdd() {
            this.$store.commit("add");
        },
        handleDesc() {
            this.$store.commit("desc");
        },
        handleAddN() {
            this.$store.commit("addN", 5);
        },
        handlesub() {
            this.sub();
        },
        handlesubN() {
            this.subN(5);
        },
        handleAsync() {
            this.$store.dispatch("AsyncAdd");
        },
        handleAsyncN() {
            this.$store.dispatch("AsyncAddN", 5);
        },
        handleAsyncsub() {
            this.AsyncAdd();
        },
        handleAsyncsubN() {
            this.AsyncAddN(5);
        }
    },
    created() {},
    mounted() {}
};
</script>
<style scoped></style>
