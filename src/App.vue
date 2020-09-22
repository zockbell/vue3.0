<template>
  <Frament>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />

    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
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
