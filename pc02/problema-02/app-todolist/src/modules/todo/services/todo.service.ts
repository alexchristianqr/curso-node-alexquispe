import { httpAdapterService } from "../../../core/services";
import { Todo } from "../interfaces";

export class TodoService {
  static async getTodos() {
    try {
      return await httpAdapterService.get("/todo");
    } catch (error) {
      return error;
    }
  }
  static async createTodo(payload: Todo) {
    try {
      const data = {
        payload,
      };
      return await httpAdapterService.post("/todo", data);
    } catch (error) {
      return error;
    }
  }
  static async updateTodo(payload: Todo) {
    try {
      const data = {
        payload,
      };
      return await httpAdapterService.put(`/todo/${payload._id}`, data);
    } catch (error) {
      return error;
    }
  }
  static async deleteTodo(payload: Todo) {
    try {
      const data = {
        payload,
      };
      return await httpAdapterService.delete(`/todo/${payload._id}`, data);
    } catch (error) {
      return error;
    }
  }
}
