<template>
  <Frament>
    <h1>{{ msg }}</h1>
    <van-button type="success" @click="count++"
      >点击数字: {{ count }}</van-button
    >
    <p></p>
  </Frament>
</template>

<script lang="ts">
import { Button } from "vant";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
