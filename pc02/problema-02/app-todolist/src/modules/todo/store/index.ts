import { defineStore } from "pinia";
import { Todo } from "../interfaces/todo";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    paginated: {
      data: [],
    } as any,
    list: {
      data: [] as Array<Todo>,
    },
  }),
  getters: {},
  actions: {
    async getTodos() {
      try {
      } catch (error) {}
    },
  },
});
