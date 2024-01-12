import { Todo } from "./todo.schema.js";

class TodoService {
  async getAll() {
    return Todo.find();
  }
  async create(data) {
    const { payload } = data;
    const result = await Todo.create(payload);
    return result;
  }
}

export const todoService = new TodoService();
