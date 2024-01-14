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
      const { result } = await TodoService.getTodos();
      this.list.data = result;
    },
    async createTodo(payload: Todo) {
      const { result } = await TodoService.createTodo(payload);
      this.list.data.unshift(result);
    },
    async updateTodo(payload: Todo) {
      // console.log(payload._id, "[updateTodo]");
      const id = payload._id;
      const { result } = await TodoService.updateTodo(payload);
      const item = this.list.data.find((item) => item._id == id);
      if (!item) return;
      item.description = result.description;
      item.status = result.status;
      item.created_at = result.created_at;
      item.updated_at = result.updated_at;
    },
    async deleteTodo(payload: Todo) {
      const id = payload._id;
      await TodoService.deleteTodo(payload);
      this.list.data = this.list.data.filter((item) => item._id !== id);
    },
  },
});
