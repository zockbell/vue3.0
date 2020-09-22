import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";

// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHistory(),
  // 路由地址
  routes: [
    {
      path: "/",
      // component: Home,
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      // component: Contact,
      component: () => import("../views/Contact.vue"),
    },
    {
      path: "/todo",
      // component: Contact,
      component: () => import("../views/Todo.vue"),
    },
    // {
    //   // 404
    //   path: "*",
    //   name: "NotFound404",
    //   component: () => import("../views/404.vue"),
    //   meta: {
    //     title: "页面不存在",
    //   },
    // },
  ],
});
