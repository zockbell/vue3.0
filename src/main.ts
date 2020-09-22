import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";

const app = createApp(App);

// 通过use 将 路由插件安装到 app 中
app.use(router);
app.use(store);
app.mount("#app");
