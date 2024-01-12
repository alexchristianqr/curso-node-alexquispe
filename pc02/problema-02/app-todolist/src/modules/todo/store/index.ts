import { defineStore } from "pinia";
import { Todo } from "../interfaces/todo";
import { TodoService } from "../services/todo.service.ts";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    paginated: {
      data: [],
    } as any,
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
      console.log({ result });
      this.list.data = result;
    },
  },
});
