import Vue from "vue";
import { Button, Form, FormItem, Input, Message, Checkbox, CheckboxGroup } from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.prototype.$message = Message; //全局挂载
