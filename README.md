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

**1. 创建一个 template**
组件来说，大多代码在 Vue2 和 Vue3 都非常相似。Vue3 支持碎片(Fragments)，就是说在组件可以拥有多个根节点。

这种新特性可以减少很多组件之间的 div 包裹元素。在开发 vue 的时候，我们会发现每一个组件都会有个 div 元素包裹着。就会出现很多层多余的 div 元素。碎片(Fragments)解决了这个问题。对于有完美强迫症的童鞋“真的是太棒了”。我们这里的例子里就不展示了，用简单的单根节点的组件。

- Vue2 表格 template

```
<template>
  <div class='form-element'>
    <h2> {{ title }} </h2>
    <input type='text' v-model='username' placeholder='Username' />

    <input type='password' v-model='password' placeholder='Password' />

    <button @click='login'>
      Submit
    </button>
    <p>
      Values: {{ username + ' ' + password }}
    </p>
  </div>
</template>
```

- vue3
  在 Vue3 的唯一真正的不同在于数据获取。Vue3 中的反应数据（Reactive Data）是包含在一个反应状态（Reactive State）变量中。— 所以我们需要访问这个反应状态来获取数据值。

```
<template>
  <div class='form-element'>
    <h2> {{ state.title }} </h2>
    <input
    type='text'
    v-model='state.username'
    placeholder='Username'
    />

    <input
    type='password'
    v-model='state.password'
    placeholder='Password'
    />

    <button @click='login'>
      Submit
    </button>
    <p>
      Values: {{ state.username + ' ' + state.password }}
    </p>
  </div>
</template>
```

---

**2. 建立数据 data**
这里就是 Vue2 与 Vue3 最大的区别 — Vue2 使用选项类型 API（Options API）对比 Vue3 合成型 API（Composition API）

旧的选项型 API 在代码里分割了不同的属性（properties）：data，computed 属性，methods，等等。新的合成型 API 能让我们用方法（function）来分割，相比于旧的 API 使用属性来分组，这样代码会更加简便和整洁。

- Vue2 - 这里把两个数据放入 data 属性中

```
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
```

- vue3
  在 Vue3.0，我们就需要使用一个新的 setup()方法，此方法在组件初始化构造的时候触发。

为了可以让开发者对反应型数据有更多的控制，我们可以直接使用到 Vue3 的反应 API（reactivity API）。
使用以下三步来建立反应性数据:

- 从 vue 引入 reactive
- 使用 reactive()方法来声明我们的数据为反应性数据
- 使用 setup()方法来返回我们的反应性数据，从而我们的 template 可以获取这些反应性数据
  上一波代码，让大家更容易理解是怎么实现的。

```
import { reactive } from'vue'

export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: ''
    })

    return { state }
  }
}
```

这里构造的反应性数据就可以被 template 使用，可以通过 state.username 和 state.password 获得数据的值。

**3.Vue2 对比 Vue3 的 methods 编写**

- Vue2 的选项型 API 是把 methods 分割到独立的属性区域的。我们可以直接在这个属性里面添加方法来处理各种前端逻辑。

```
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 登陆方法
    }
  }
}
```

- Vue3 的合成型 API 里面的 setup()方法也是可以用来操控 methods 的。创建声明方法其实和声明数据状态是一样的。— 我们需要先声明一个方法然后在 setup()方法中返回(return)， 这样我们的组件内就可以调用这个方法了。

```
export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: ''
    })

    const login = () => {
      // 登陆方法
    }
    return {
      login,
      state
    }
  }
}
```

**4. 生命周期钩子 — Lifecyle Hooks**

- 在 Vue2，我们可以直接在组件属性中调用 Vue 的生命周期的钩子。以下使用一个组件已挂载（mounted）生命周期触发钩子。

```
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    console.log('组件已挂载')
  },
  methods: {
    login () {
      // login method
    }
  }
}
```

- 现在 Vue3 的合成型 API 里面的 setup()方法可以包含了基本所有东西。生命周期的钩子就是其中之一！

但是在 Vue3 生周期钩子不是全局可调用的了，需要另外从 vue 中引入。和刚刚引入 reactive 一样，生命周期的挂载钩子叫 onMounted。

引入后我们就可以在 setup()方法里面使用 onMounted 挂载的钩子了。

```
import { reactive, onMounted } from'vue'

exportdefault {
  props: {
    title: String
  },
  setup () {
    // ..

    onMounted(() => {
      console.log('组件已挂载')
    })

    // ...
  }
}
```

---

**5. 计算属性 - Computed Properties**
我们一起试试添加一个计算属性来转换 username 成小写字母。

- 在 Vue2 中实现，我们只需要在组件内的选项属性中添加即可

```
export default {
  // ..
  computed: {
    lowerCaseUsername () {
      returnthis.username.toLowerCase()
    }
  }
}
```

- Vue3 的设计模式给予开发者们按需引入需要使用的依赖包。这样一来就不需要多余的引用导致性能或者打包后太大的问题。Vue2 就是有这个一直存在的问题。

所以在 Vue3 使用计算属性，我们先需要在组件内引入 computed。

使用方式就和反应性数据（reactive data）一样，在 state 中加入一个计算属性:

```
import { reactive, onMounted, computed } from'vue'

export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase())
    })

    // ...
  }
```

**6. 接收 Props**
接收组件 props 参数传递这一块为我们带来了 Vue2 和 Vue3 之间最大的区别。—this 在 vue3 中与 vue2 代表着完全不一样的东西。

- 在 Vue2，this 代表的是当前组件，不是某一个特定的属性。所以我们可以直接使用 this 访问 prop 属性值。就比如下面的例子在挂载完成后打印出当前传入组件的参数 title。

```
mounted () {
    console.log('title: ' + this.title)
}
```

- 但是在 Vue3 中，this 无法直接拿到 props 属性，emit events（触发事件）和组件内的其他属性。不过全新的 setup()方法可以接收两个参数：

props - 不可变的组件参数
context - Vue3 暴露出来的属性（emit，slots，attrs）
所以在 Vue3 接收与使用 props 就会变成这样：

```
setup (props) {
    // ...

    onMounted(() => {
      console.log('title: ' + props.title)
    })

    // ...
}
```

**7. 事件 - Emitting Events**
在 Vue2 中自定义事件是非常直接的，但是在 Vue3 的话，我们会有更多的控制的自由度。

举例，现在我们想在点击提交按钮时触发一个 login 的事件。

在 Vue2 中我们会调用到 this.\$emit 然后传入事件名和参数对象。

```
login () {
  this.$emit('login', {
    username: this.username,
    password: this.password
  })
}
```

但是在 Vue3 中，我们刚刚说过 this 已经不是和 vue2 代表着这个组件了，所以我们需要不一样的自定义事件的方式。
在 setup()中的第二个参数 content 对象中就有 emit，这个是和 this.\$emit 是一样的。那么我们只要在 setup()接收第二个参数中使用分解对象法取出 emit 就可以在 setup 方法中随意使用了。

然后我们在 login 方法中编写登陆事件：

```
setup (props, { emit }) {
  // ...

  const login = () => {
    emit('login', {
      username: state.username,
      password: state.password
    })
  }

  // ...
}
```

---

**8. 最终的 vue2 对比 vue3 代码**
如果接触过 React 然后现在想使用 Vue 的话，应该特别兴奋，因为很多使用方式都和 React 非常相近了.

全新的合成式 API（Composition API）可以提升代码的解耦程度 —— 特别是大型的前端应用，效果会更加明显。还有就是按需引用的有了更细微的可控性，让项目的性能和打包大小有更好的控制。

最后完成的 Vue2 和 Vue3 的组件代码发出来给大家：

- **Vue2**

```
<template>
  <div class='form-element'>
    <h2> {{ title }} </h2>
    <input type='text' v-model='username' placeholder='Username' />

    <input type='password' v-model='password' placeholder='Password' />

    <button @click='login'>
      Submit
    </button>
    <p>
      Values: {{ username + ' ' + password }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    console.log('title: ' + this.title)
  },
  computed: {
    lowerCaseUsername () {
      return this.username.toLowerCase()
    }
  },
  methods: {
    login () {
      this.$emit('login', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
```

- **Vue3**

```
<template>
  <div class='form-element'>
    <h2> {{ state.title }} </h2>
    <input type='text' v-model='state.username' placeholder='Username' />

    <input type='password' v-model='state.password' placeholder='Password' />

    <button @click='login'>
      Submit
    </button>
    <p>
      Values: {{ state.username + ' ' + state.password }}
    </p>
  </div>
</template>
<script>
import { reactive, onMounted, computed } from 'vue'

export default {
  props: {
    title: String
  },
  setup (props, { emit }) {
    const state = reactive({
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase())
    })

    onMounted(() => {
      console.log('title: ' + props.title)
    })

    const login = () => {
      emit('login', {
        username: state.username,
        password: state.password
      })
    }

    return {
      login,
      state
    }
  }
}
</script>
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
