<template>
  <Frament>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />

    <!-- <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/todo">Todolist</router-link> -->

    <van-button type="primary" plain to="/" size="small">首页</van-button>
    <van-button
      type="primary"
      plain
      to="about"
      size="small"
      style="margin: 0 20px"
      >关于</van-button
    >
    <van-button type="primary" plain to="todo" size="small">
      Todolist
    </van-button>
    <p></p>

    <router-view />
  </Frament>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>
