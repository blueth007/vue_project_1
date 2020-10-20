import Vue from "vue";
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Checkbox,
    CheckboxGroup,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

Vue.prototype.$message = Message; //全局挂载
