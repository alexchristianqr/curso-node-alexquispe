import { httpAdapterService } from "../../../core/services";
import { Todo } from "../interfaces";

export class TodoService {
  static async getTodos() {
    try {
      const response = await httpAdapterService.get("/todo");
      return response.data;
    } catch (error) {
      return error;
    }
  }
  static async createTodo(payload: Todo) {
    try {
      payload.created_at = new Date();
      const data = {
        payload,
      };
      const response = await httpAdapterService.post("/todo", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  static async updateTodo(payload: Todo) {
    try {
      payload.updated_at = new Date();
      const data = {
        payload,
      };
      const response = await httpAdapterService.put(`/todo/${payload._id}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  static async deleteTodo(payload: Todo) {
    try {
      const data = {
        payload,
      };
      const response = await httpAdapterService.delete(`/todo/${payload._id}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
