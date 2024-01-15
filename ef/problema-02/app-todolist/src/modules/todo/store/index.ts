import { defineStore } from "pinia";
import { Todo } from "../interfaces";
import { todoService } from "../services/todo.service.ts";
import { qalertNotify } from "../../../core/utils";

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
      const { result } = await todoService.getTodos();
      this.list.data = result;
    },
    async createTodo(payload: Todo) {
      const { result } = await todoService.createTodo(payload);
      this.list.data.unshift(result);

      qalertNotify({
        message: "Registro creado con éxito",
      });
    },
    async updateTodo(payload: Todo) {
      const id = payload._id;
      const { result } = await todoService.updateTodo(payload);
      const item = this.list.data.find((item) => item._id == id);
      if (!item) return;
      item.description = result.description;
      item.status = result.status;
      item.created_at = result.created_at;
      item.updated_at = result.updated_at;

      qalertNotify({
        message: "Registro actualizado con éxito",
      });
    },
    async deleteTodo(payload: Todo) {
      const id = payload._id;
      await todoService.deleteTodo(payload);
      this.list.data = this.list.data.filter((item) => item._id !== id);

      qalertNotify({
        message: "Registro eliminado con éxito",
      });
    },
  },
});
