import Axios from "axios";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //全局变量
        count: 0,
        todolist: []
    },
    mutations: {
        //不能作为异步函数处理store
        //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
        add(state) {
            state.count++;
        },
        desc(state) {
            state.count--;
        },
        addN(state, n) {
            state.count += n;
        },
        sub(state) {
            state.count--;
        },
        subN(state, n) {
            state.count -= n;
        },
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

        AsyncAdd(context) {
            //必须通过context调用mutation的值
            setTimeout(() => {
                context.commit("add");
            }, 2000);
        },
        AsyncAddN(context, n) {
            //必须通过context调用mutation的值
            setTimeout(() => {
                context.commit("addN", n);
            }, 2000);
        },
        AsyncTodoList(context) {
            Axios.get("/todolist").then(({ data }) => {
                console.log(data);
                if (data.code == 1) {
                    context.commit("initTodoList", data.data);
                } else {
                    alert("get Wrong!");
                }
            });
        }
    },
    getters: {
        //对store变量的另外加工,不会改变state的值
        big(state) {
            return "返回的值是大值+5后:< " + (state.count - 0 + 5) + " >";
        },
        unCompleted(state) {
            return state.todolist.filter(it => !it.completed);
        },
        Compalted(state) {
            return state.todolist.filter(it => it.completed);
        }
    }
});
