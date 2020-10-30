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
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Table,
    TableColumn,
    Switch,
    Pagination,
    Dialog,
    Tag,
    Row,
    Col,
    Loading,
    MessageBox
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
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);

Vue.prototype.$message = Message; //全局挂载
Vue.prototype.$confirm = MessageBox.confirm;
