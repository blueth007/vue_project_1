import Axios from "axios";
//单独抽离后 不需要引入
// import Vue from "vue";
// import Vuex from "vuex";

export default {
    namespaced: true,
    state: {
        //全局变量
        todolist: []
    },
    mutations: {
        //不能作为异步函数处理store
        //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

        initTodoList(state, value) {
            state.todolist = value;
        },
        changeTodolist(state, val) {
            state.todolist = state.todolist.map(item => {
                if (item.id == val.id) {
                    return val;
                } else return item;
            });
        },
        addTodoList(state, val) {
            state.todolist.push(val);
        }
    },
    actions: {
        /**
         Action 类似于 mutation，不同在于：
               Action 提交的是 mutation，而不是直接变更状态。
               Action 可以包含任意异步操作。
        **/

        AsyncTodoList({ commit }) {
            Axios.get("/todolist").then(({ data }) => {
                console.log(data);
                if (data.code == 1) {
                    commit("initTodoList", data.data);
                } else {
                    alert("get Wrong!");
                }
            });
        }
    },
    getters: {
        //对store变量的另外加工,不会改变state的值

        unCompleted(state) {
            return state.todolist.filter(it => !it.completed);
        },
        Compalted(state) {
            return state.todolist.filter(it => it.completed);
        }
    }
};
