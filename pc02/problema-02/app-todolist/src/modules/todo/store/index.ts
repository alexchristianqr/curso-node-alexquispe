import { defineStore } from "pinia";
import { Todo } from "../interfaces";
import { TodoService } from "../services/todo.service.ts";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: {
      data: [] as Array<Todo>,
    },
  }),
  getters: {
    todos: (state) => state.list.data,
  },
  actions: {
    async getTodos() {
      const response = await TodoService.getTodos();
      const { result = undefined } = response.data;
      this.list.data = result;
    },
    async createTodo(payload: Todo) {
      const response = await TodoService.createTodo(payload);
      const { result = undefined } = response.data;
      this.list.data.unshift(result);
    },
  },
});
