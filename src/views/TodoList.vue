<template>
    <div class=" ">
        <el-card>
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-input placeholder="输入添加的待办事项" v-model="newItem"></el-input>
                </el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="handleAdd">
                        <i class="el-icon-circle-plus">
                            添加
                        </i>
                    </el-button>
                </el-col>
            </el-row>

            <el-tabs v-model="activeName">
                <el-tab-pane label="所有事项" name="all">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-row v-for="city in todolist" :key="city.id">
                            <el-col :span="18">
                                <el-checkbox
                                    :class="city.deleted ? 'deleted' : ''"
                                    :label="city.item"
                                    @change="handleChecked(city)"
                                ></el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    :disabled="city.deleted"
                                    @click="handleDeleteItem(city)"
                                    >删除</el-button
                                >
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="待办事项" name="isUnCompleted">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-row v-for="city in unCompleted" :key="city.id">
                            <el-col :span="18">
                                <el-checkbox
                                    :class="city.deleted ? 'deleted' : ''"
                                    :label="city.item"
                                    @change="handleChecked(city)"
                                ></el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    :disabled="city.deleted"
                                    @click="handleDeleteItem(city)"
                                    >删除</el-button
                                >
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="已完成事项" name="isCompleted">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-row v-for="city in Compalted" :key="city.id">
                            <el-col :span="18">
                                <el-checkbox
                                    :label="city.item"
                                    :class="city.deleted ? 'deleted' : ''"
                                    checked
                                    @change="handleChecked(city)"
                                ></el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    :disabled="city.deleted"
                                    @click="handleDeleteItem(city)"
                                    >删除</el-button
                                >
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "TodoList",
    components: {},
    props: {},
    data() {
        return {
            checkedCities: [],
            newItem: "",
            activeName: "all"
        };
    },
    watch: {},
    computed: {
        todolist() {
            return this.$store.state.todolist;
        },
        unCompleted() {
            return this.$store.state.todolist.filter(it => !it.completed);
        },
        Compalted() {
            return this.$store.state.todolist.filter(it => it.completed);
        }
    },
    methods: {
        ...mapActions(["AsyncTodoList"]),

        handleChecked(value) {
            //console.log("CHANGE", value);
            this.$store.commit("changeTodolist", { ...value, completed: !value.completed });
        },
        handleCheckedCitiesChange() {
            // console.log(this.Compalted.map(it => it.item));
            this.checkedCities = this.Compalted.map(it => it.item);
        },
        handleDeleteItem(value) {
            this.$store.commit("changeTodolist", { ...value, deleted: true });
        },
        handleAdd() {
            const newV = {
                id: Math.random() * 100 + 100,
                item: this.newItem,
                deleted: false,
                completed: false
            };
            this.$store.commit("addTodoList", newV);
            this.newItem = "";
        }
    },
    created() {
        this.AsyncTodoList();
    },
    mounted() {
        console.log(this.todolist);
    }
};
</script>
<style lang="scss" scoped>
.el-row {
    margin: 10px;
}
.el-checkbox-group {
    .el-checkbox {
        display: block;
        margin-right: 0;
        font-size: 14px;
    }
    .el-row {
        border-bottom: 1px solid rgba($color: #7c7a7a, $alpha: 0.3);
        padding: 8px 12px;
        margin: 0;
    }
    .deleted {
        position: relative;
        color: #ccc;
        &::after {
            position: absolute;
            content: "";
            width: 90%;
            height: 0;
            top: 45%;
            left: 16px;
            border: 2px solid rgba(245, 1, 1, 0.2);
        }
    }
}
</style>
