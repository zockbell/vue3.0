vue3.0.0 初体验

vue3.0正式版在9月18日更新了。引来了前端圈的一个热烈关注，打开[官网](https://v3.cn.vuejs.org/) 了解一番。目前状态都处于Beta阶段，建议大家抱着学习的心态入场，勿急于用到生产环境，于是我觉得可以到此结束了。

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

注意：如果是windows系统当执行第一句命令报错时，比如：info fsevents@1.2.9: The platform "win32" is incompatible with this module.

需要手动升级node版本，于是成功提示如下图：

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
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
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

>  发现创建Vue的方式变了，原来是通过new Vue的方法来初始化Vue，在Vue3.0中，修改为了通过createApp的方式。

## 三、配置typescript

vue3是由TS开发而成，typescript现在已经成为了前端必备技能之一，大量的项目也开始基于typescript进行开发。使用vite配置typescript很简单，只需要进行以下几步操作.

1. 安装TS

   ```node
   yarn add typescript -D
   ```

2. 初始化tsconfig.json

   ```node
   npx tsc --init
   ```

3. 将main.js修改为main.ts,同时将index.html里面的引用也修改为main.ts, 通过还需要修改App.vue与HelloWorld.vue文件，修改方式如下:

   ```js
   <!--将 <script> 修改为 <script lang="ts">-->
   ```

   

4. 修改完之后，重启就可以访问项目了。虽然这样配置是可以了，但是打开main.ts会发现import App from App.vue会报错: Cannot find module './App.vue' or its corresponding type declarations.,这是因为现在ts还没有识别vue文件，需要进行下面的配置:

   ![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/4.png)

   1. 在项目根目录添加shim.d.ts文件

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

## 四、配置vue-router

[官网地址](https://router.vuejs.org/zh/)

[配置参考](https://zhuanlan.zhihu.com/p/138444490)

在Vue2.x中我们路由一般会选择使用vue-router,在Vue3.0依然可以使用vue-router,不过和Vue3.0一样当前vue-router的版本也是beta版本，在本文撰写的时候，版本是4.0.0-beta7

版本说明：

对于 TypeScript 用户来说，vue-router@3.0+ 依赖 vue@2.5+，反之亦然。

1. 安装vue-router

   > 因为当前vue-router针对vue3.0的版本还是beta版本，所以不能直接通过yarn add vue-router进行安装，而是需要带上版本号，本项目安装最高版本

   ```
   yarn add vue-router@4.0.0-alpha.14
   ```

   ![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/7.png)

2. 配置vue-router

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

3. 将router引入到main.ts中

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

与vue-router一样，新的vuex当前也处于beta版本，当前版本是4.0.0-beta.4

1. 安装vuex

   ```node
   yarn add vuex@4.0.0-beta.4
   ```

   

2. 配置vuex

   在项目src目录下面新建store目录，并添加index.ts文件，文件中添加以下内容

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

   

3. 引入到main.ts中

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

Vue Devtools 开发者工具，需要重新添加对应的beta版本才可以用来调试，否则无效。

![](https://github.com/zockbell/vue3.0/blob/master/src/assets/imgs/8.png)

## 七、TodoList实例：

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

## 八、Vue3开源组件库

截止9月23日，基于Vue3重构的开源组件库

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

   elementui风格的组件库，Vue3.0 重构版

   

   现状：没有明确发布计划，目前还在紧急开发中，有兴趣参与开源项目的也可以去issues认领任务

   

   地址：https://element-plus.org/#/zh-CN/component/installation

   以上组件，全部亲测，目前只有Vant3.0支持，其他全不支持，本项目使用vant3.0组件。

   > 由于目前所有功能全不稳定，所以采用导入所有组件

## 九、Composition API 组合式api

官网介绍：https://composition-api.vuejs.org/zh/

我们为单文件组件提出了**两个新特性**[18]（SFC，又称为 `.vue` 文件）:

<script setup>：在 SFC 内使用 Composition API 的语法糖
<style vars>：在 SFC 中支持将状态作为 CSS 变量注入到样式中

