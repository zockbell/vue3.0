<template>
  <Frament>
    <van-form @submit="onSubmit">
      <van-field
        v-model="message"
        name="请输入"
        label="请输入"
        placeholder="输入关键字"
        @keyup.enter="addTodoHandle"
        :rules="[{ required: true, message: '请输入内容' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          @click="addTodoHandle"
        >
          提交
        </van-button>
      </div>
    </van-form>

    <van-list
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in todoList"
        :key="item.id"
        :title="item.text"
        @click="removeTodoHandle(item.id)"
      />
    </van-list>
  </Frament>
</template>

<script lang="ts">
import { Form, List } from "vant";

export default {
  data() {
    return {
      message: null,
      todoList: [],
      loading: false,
      finished: false,
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
      this.message = "";
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

.van-form {
  border: 1px solid #ddd;
}

@media screen and (min-width: 1024px) {
  body {
    width: 750px;
    margin: 0 auto;
  }
}
</style>
