# vue3.0.0 初体验

vue3.0 正式版在 9 月 18 日更新了。引来了前端圈的一个热烈关注，打开[官网](https://v3.cn.vuejs.org/) 了解一番。目前状态都处于 Beta 阶段，建议大家抱着学习的心态入场，勿急于用到生产环境，于是我觉得可以到此结束了。

NO，还是要了解尝试一下的。

## 一、简介

> Vue 团队于 2020 年 9 月 18 日晚 11 点半发布了 Vue 3.0 版本，我们连夜对 Release 进行了翻译。由于时间仓促，文中如有翻译不当的地方还望提出。如有侵权，请联系删帖。以下为译文正文。
> 原文：[https://github.com/vuejs/vue-next/releases](https://link.zhihu.com/?target=https%3A//github.com/vuejs/vue-next/releases)
> 作者：Vue 团队
> 译者：QC-L

官方：今天，我们非常自豪地宣布 Vue.js 3.0 "One Piece" 发布。本次主版本更新包含性能的改进，更小的 bundle 体积，对 TypeScript 更好的支持，用于处理大规模用例的全新 API，以及为框架未来的长期迭代奠定了夯实的基础。

3.0 的发布意味着两年多以来的努力，其中包含 **30+ RFC[1]**，2600+ commits，**99 位贡献者[2]**所提交的 **628 个 PR[3]**，还有许多除核心仓库以外的开发及文档编写工作。在此对 Vue 团队成员表示最深切的感谢，感谢贡献者们提交的 PR，感谢**赞助商和 sponsors[4]** 的资金支持，感谢广大社区成员参与预发布版本的设计与谈论，并提供反馈。Vue 是一个独立项目，为社区建立，也由社区维护，没有大家的鼎立支持，Vue 3.0 是不可能实现的。

以上的一个介绍，来自[知乎](https://zhuanlan.zhihu.com/p/254219538)

目前，面向 Vue 3 和 v3 的项目的文档网站，GitHub 分支和 npm dist 标签将保持在下一个状态。这意味着 `npm install vue` 仍将安装 Vue 2.x，`npm install vue@next` 将安装 Vue 3。**我们计划在 2020 年底之前将所有文档链接，分支和 dist 标签切换为默认值 3.0**。

## 二、vite

[**Vite**](https://github.com/vitejs/vite) 是一个 web 开发构建工具，由于其原生 ES 模块导入方法，它允许快速提供代码。

1. 通过在终端中运行以下命令，可以使用 Vite 快速设置 Vue 项目。

使用 NPM：

```node
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

或者 yarn：

```node
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

注意：如果是 windows 系统当执行第一句命令报错时，比如：info fsevents@1.2.9: The platform "win32" is incompatible with this module.

需要手动升级 node 版本，于是成功提示如下图：

![img](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/1.png)

2. 依次执行命令：

```node
 cd zock-vue3
 npm install (or `yarn`)
 npm run dev (or `yarn dev`)
```

项目正式启动：

![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/2.png)

![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/3.png)

3. 目录结构

   ![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/4.png)

main.ts 文件：

```js
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

createApp(App).mount("#app");
```

对比一下`vue2.6.10`的`main.js`配置：

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css'; // 导入iview样式
import './assets/styles/common.scss';
import './assets/fonts/iconfont.css';
import '@/api/axiosConfig';

Vue.config.productionTip = false;

// 全局过滤器
import * as filtration from '@/utils/filters';
Object.keys(filtration).forEach((key) => {
  Vue.filter(key, (filtration as any)[key]);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
```

> 发现创建 Vue 的方式变了，原来是通过 new Vue 的方法来初始化 Vue，在 Vue3.0 中，修改为了通过 createApp 的方式。

## 三、配置 typescript

vue3 是由 TS 开发而成，typescript 现在已经成为了前端必备技能之一，大量的项目也开始基于 typescript 进行开发。使用 vite 配置 typescript 很简单，只需要进行以下几步操作.

1. 安装 TS

   ```node
   yarn add typescript -D
   ```

2. 初始化 tsconfig.json

   ```node
   npx tsc --init
   ```

3. 将 main.js 修改为 main.ts,同时将 index.html 里面的引用也修改为 main.ts, 通过还需要修改 App.vue 与 HelloWorld.vue 文件，修改方式如下:

   ```js
   <!--将 <script> 修改为 <script lang="ts">-->
   ```

4. 修改完之后，重启就可以访问项目了。虽然这样配置是可以了，但是打开 main.ts 会发现 import App from App.vue 会报错: Cannot find module './App.vue' or its corresponding type declarations.,这是因为现在 ts 还没有识别 vue 文件，需要进行下面的配置:

   ![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/4.png)

   1. 在项目根目录添加 shim.d.ts 文件

   2. 添加以下内容：

      ```js
      declare module "*.vue" {
        import { Component } from "vue";
        const component: Component;
        export default component;
      }
      ```

5. 启动：

   ![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/6.png)

## 四、配置 vue-router

[官网地址](https://router.vuejs.org/zh/)

[配置参考](https://zhuanlan.zhihu.com/p/138444490)

在 Vue2.x 中我们路由一般会选择使用 vue-router,在 Vue3.0 依然可以使用 vue-router,不过和 Vue3.0 一样当前 vue-router 的版本也是 beta 版本，在本文撰写的时候，版本是 4.0.0-beta7

版本说明：

对于 TypeScript 用户来说，vue-router@3.0+ 依赖 vue@2.5+，反之亦然。

1. 安装 vue-router

   > 因为当前 vue-router 针对 vue3.0 的版本还是 beta 版本，所以不能直接通过 yarn add vue-router 进行安装，而是需要带上版本号，本项目安装最高版本

   ```
   yarn add vue-router@4.0.0-alpha.14
   ```

   ![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/7.png)

2. 配置 vue-router

   ```js
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
         path: "/contact",
         // component: Contact,
         component: () => import("../views/Contact.vue"),
       },
       {
         // 404
         path: "*",
         name: "NotFound404",
         component: () => import("../views/404.vue"),
         meta: {
           title: "页面不存在",
         },
       },
     ],
   });
   ```

   注意：路由地址必须按需引入，否则报错。

3. 将 router 引入到 main.ts 中

   ```js
   import { createApp } from "vue";
   import App from "./App.vue";
   import "./index.css";
   import router from "./router/index";

   const app = createApp(App);
   // 通过use 将 路由插件安装到 app 中
   app.use(router);
   app.mount("#app");
   ```

4. `App.vue` 中添加

   ```js
   <router-view />
   ```

## 五、 配置 vuex

与 vue-router 一样，新的 vuex 当前也处于 beta 版本，当前版本是 4.0.0-beta.4

1. 安装 vuex

   ```node
   yarn add vuex@4.0.0-beta.4
   ```

2. 配置 vuex

   在项目 src 目录下面新建 store 目录，并添加 index.ts 文件，文件中添加以下内容

   ```js
   import { createStore } from "vuex";

   interface State {
     userName: string;
   }

   export default createStore({
     state(): State {
       return {
         userName: "zock",
       };
     },
   });
   ```

3. 引入到 main.ts 中

   ```js
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
   ```

## 六、 Vue Devtools

Vue Devtools 开发者工具，需要重新添加对应的 beta 版本才可以用来调试，否则无效。

![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/8.png)

## 七、TodoList 实例：

```html
<template>
  <Frament>
    <div>
      输入：<input
        v-model="message"
        placeholder=""
        @keyup.enter="addTodoHandle"
      />
    </div>
    <ul>
      <li
        v-for="item in todoList"
        :key="item.id"
        @click="removeTodoHandle(item.id)"
      >
        {{ item.text }}
      </li>
    </ul>
  </Frament>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        message: null,
        todoList: [],
      };
    },
    methods: {
      addTodoHandle() {
        if (!this.message) return;
        var itemObj = {};
        itemObj["id"] = this.todoList.length;
        itemObj["done"] = false;
        itemObj["text"] = this.message;
        // console.log(itemObj);
        this.todoList.push(itemObj);
        this.message = null;
      },

      removeTodoHandle(id) {
        console.log(id);
        let index = this.todoList.findIndex((item) => item.id === id);
        this.todoList.splice(index, 1);
      },
    },
  };
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    cursor: pointer;
    list-style-type: none;
    padding: 10px;
    text-align: left;
    margin: 10px 0;
    background: #f2f2f2;
  }
</style>
```

## 八、Vue3 开源组件库

截止 9 月 23 日，基于 Vue3 重构的开源组件库

1. Ant-design-vue:

   ant-design-vue 是 Ant Design 的 Vue 实现，组件的风格与 Ant Design 保持同步，组件的 html 结构和 css 样式也保持一致，真正做到了样式 0 修改，组件 API 也尽量保持了一致

   现状：支持 Vue 3.0 的 2.0.0 测试版 已发布

   地址：<https://antdv.com/docs/vue/introduce-cn/>

   <https://2x.antdv.com/docs/vue/introduce-cn/>

2. Vant 3.0

   Vant 是有赞前端团队开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。

   Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一

   现状：目前 Vant 已完成了对 Vue 3.0 的适配工作，并发布了 Vant 3.0 Beta 版本，计划在十月底或十一月发布 Vant 3.0 正式版

   地址：<https://vant-contrib.gitee.io/vant/next>

   <https://github.com/youzan/vant/issues/7035>

3. Element-plus

   elementui 风格的组件库，Vue3.0 重构版

   现状：没有明确发布计划，目前还在紧急开发中，有兴趣参与开源项目的也可以去 issues 认领任务

   地址：https://element-plus.org/#/zh-CN/component/installation

   以上组件，全部亲测，目前只有 Vant3.0 支持，其他全不支持，本项目使用 vant3.0 组件。但目前部署到线上感觉样式并未加载，可能版本也不够稳定。

   > 由于目前所有功能全不稳定，所以采用导入所有组件

## 九、Composition API 组合式 api

这里内容实在过多，推荐官网：https://composition-api.vuejs.org/zh/

我们为单文件组件提出了**两个新特性**[18]（SFC，又称为 `.vue` 单文件组件）:

```
<script setup>：在 SFC 内使用 Composition API 的语法糖
<style vars>：在 SFC 中支持将状态作为 CSS 变量注入到样式中
```

## 十、nginx 部署

本系统 demo：http://49.232.200.171/

由于 3.0.0-beta.0 版本还未正式发布，所以部署到线上样式有问题，下图为开发环境

![1600850216830](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/10.png)

## 十一、 体验总结

正如官网所说：

> ⚠️ Beta Version: Docs are in development and subject to change.

这句话没有错，体验的过程中我的 windows 系统并没有感受到 vite 如官网所说的轻和快，另外 vite 的热更新有 bug，不会及时响应页面渲染视图。比如此项目构建用了不到 8 秒

![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/9.png)

1. 目前所有的版本都在逐渐完善，相信 vue3.0 稳定版一定会给到我们最大惊喜。

2. 各 UI 组件库也在不断完善中，暂时不稳定

3. 在 github 中并未找到 [vite](https://github.com/vitejs/vite#config-file) 的打包路径，默认部署 css 和 js 出错

   现部署 nginx 配置为：

   ```nginx
   location / {
               root /opt/home/dist;
               index index.html;
               try_files $uri $uri/ /index.html;
           }
   ```

4. 配套的`vue-router`版本是：`4.0.0-alpha.14`

   `vuex`版本是：`4.0.0-beta.4`

   都不是稳定版本。
