export default {
    namespaced: true,
    state: {
        //全局变量
        count: 9
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
        }
    },
    actions: {
        /**
         Action 类似于 mutation，不同在于：
               Action 提交的是 mutation，而不是直接变更状态。
               Action 可以包含任意异步操作。
        **/

        AsyncAdd({ commit }) {
            //必须通过context调用mutation的值
            setTimeout(() => {
                commit("add");
            }, 2000);
        },
        AsyncAddN({ commit }, n) {
            //必须通过context调用mutation的值
            setTimeout(() => {
                commit("addN", n);
            }, 2000);
        }
    },
    getters: {
        //对store变量的另外加工,不会改变state的值
        big(state) {
            return state.count + 5;
        }
    }
};
