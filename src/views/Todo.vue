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
