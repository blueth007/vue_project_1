import Vue from "vue";
import Vuex from "vuex";
import example from "./modules/example";
import todolist from "./modules/todolist";
Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    modules: {
        example,
        todolist
    }
});
