<template>
  <div class="todo-list">
    <div>
      <label>新增待办</label>
      <input v-model="state.todo" @keyup.enter="handleAddTodo" />
    </div>
    <div>
      <h3>待办列表({{ todos.length }})</h3>
      <ul>
        <li
          v-for="item in todos"
          :key="item.id"
          @click="handleChangeStatus(item, true)"
        >
          <input type="checkbox" />
          <label>{{ item.text }}</label>
        </li>
      </ul>
    </div>
    <div>
      <h3>已办列表({{ dones.length }})</h3>
    </div>
    <ul>
      <li
        v-for="item in dones"
        :key="item.id"
        @click="handleChangeStatus(item, false)"
      >
        <input type="checkbox" checked />
        <label>{{ item.text }}</label>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
// 在vue2中 data 在vue3中使用 reactive代替
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  // setup相当于vue2.0的 beforeCreate和 created，是vue3新增的一个属性，所有的操作都在此属性中完成
  setup(props, context) {
    // 通过reactive 可以初始化一个可响应的数据，与Vue2.0中的Vue.observer很相似
    const state = reactive({
      todoList: [
        {
          id: 1,
          done: false,
          text: "吃饭",
        },
        {
          id: 2,
          done: false,
          text: "睡觉",
        },
        {
          id: 3,
          done: false,
          text: "打豆豆",
        },
      ],
      todo: "",
    });
    // 使用计算属性生成待办列表
    const todos = computed(() => {
      return state.todoList.filter((item) => !item.done);
    });

    // 使用计算属性生成已办列表
    const dones = computed(() => {
      return state.todoList.filter((item) => item.done);
    });

    // 修改待办状态
    const handleChangeStatus = (item, status) => {
      item.done = status;
    };

    // 新增待办
    const handleAddTodo = () => {
      if (!state.todo) {
        alert("请输入待办事项");
        return;
      }
      state.todoList.push({
        text: state.todo,
        id: Date.now(),
        done: false,
      });
      state.todo = "";
    };

    // 在Vue3.0中，所有的数据和方法都通过在setup 中 return 出去，然后在template中使用
    return {
      state,
      todos,
      dones,
      handleChangeStatus,
      handleAddTodo,
    };
  },
};
</script>
<style scoped>
.todo-list {
  text-align: center;
}

.todo-list ul li {
  list-style: none;
}
</style>
