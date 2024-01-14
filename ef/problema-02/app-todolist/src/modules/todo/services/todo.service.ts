import { httpAdapterService } from "../../../core/services";
import { Todo } from "../interfaces";

class TodoService {
  async getTodos() {
    try {
      const response = await httpAdapterService.get("/todo");
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async createTodo(payload: Todo) {
    try {
      const data = {
        payload,
      };
      const response = await httpAdapterService.post("/todo", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async updateTodo(payload: Todo) {
    try {
      const data = {
        payload,
      };
      const response = await httpAdapterService.put(`/todo/${payload._id}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async deleteTodo(payload: Todo) {
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
export const todoService = new TodoService();
